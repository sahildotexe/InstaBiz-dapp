import pandas as pd


def setup(data):
    """
    Initial setup
    """
    pd.set_option('display.max_columns', 500)
    # Reading Dataframes -> need to read all at once as soon as server starts
    books = pd.read_csv("archive/Books.csv", low_memory='False')
   
   # print("images dict created\n\n",imgs_dict,"\n\n\n")

    ratings = pd.read_csv("archive/Ratings.csv", low_memory='False')
    users = pd.read_csv("archive/Users.csv", low_memory='False')
    print("\n read dfs\n")
    temp_df = books.merge(ratings, how='left', on='ISBN')

    # global variables
    global final_df
    global user_book_matrix

    final_df = temp_df.merge(users, how='left', on='User-ID')
    # store the dataframe, dropping urls,na, and converting user-id to int, and only taking rows with book-rating > 0,
    user_book_matrix = user_book_df(final_df)

    """
    formatting the input recieved as json
    """
    # get the last id from users.csv
    user_id = users['User-ID'].max() + 1

    """
    data = {
        "Classical Mythology": 5,
        "The Mummies of Urumchi": 4        
    }
    """    
    cols= user_book_matrix.columns
    # converted into a dataframe with cols  as colums and values as the ratings and index as user id
    user_ratingsaman = pd.DataFrame(data, index=[user_id], columns=cols)
    user_ratingsaman
    # append this to our user_book_matrix dataframe
    user_book_matrix = user_book_matrix.append(user_ratingsaman)
    # ps we dont need the user if moving forward

    user=user = int(user_id)
    user_df = user_book_matrix[user_book_matrix.index == user]

    user_read_books = user_df.columns[user_df.notna().any()].tolist()

    read_books = user_book_matrix[user_read_books]

    user_book_count_df = read_books.T.notnull().sum().reset_index()
    user_book_count_df.columns = ['User-ID','Count']

    # Choosing same readers with user having read >5 common books,storing their uids
    same_readers_with_user = user_book_count_df[user_book_count_df['Count'] > 5]['User-ID']


    # adding our user to the datafram with other user who read same book
    rec_df = pd.concat([read_books[read_books.index.isin(same_readers_with_user)],user_df[user_read_books]])

    rec_df.T.corr().unstack().sort_values(ascending=False)

    # We should take correlations between users, that's why users that in the rec_df have to change from index to columns.
    # we take the ids of the user having the highest correlation and drop the duplicates
    correlation_df = rec_df.T.corr().unstack().sort_values(ascending=False).drop_duplicates()
    correlation_df = pd.DataFrame(correlation_df,columns=['correlation'])
    correlation_df.index.names = ['User-ID-1','User-ID-2']
    correlation_df = correlation_df.reset_index()

    similar_users = correlation_df[(correlation_df['correlation'] >= 0.70) & (correlation_df['User-ID-1'] == user)][['User-ID-2','correlation']]
    similar_users = similar_users.reset_index(drop=True)
    similar_users.rename(columns={'User-ID-2':'User-ID',
                                'correlation':'Correlations'}, inplace=True)

    similar_users_df = similar_users.merge(ratings, how='inner',on='User-ID')
    similar_users_df = similar_users_df.merge(books,how='inner', on='ISBN')
    similar_users_df = similar_users_df[similar_users_df['User-ID'] != user]

    # Calculation Weighted Score (a weighting score I made just to make fair observation here, the correlations are given lessr value that the book ratings) book ratings can at max be 5
    similar_users_df['Weighted Score'] = (0.4 * similar_users_df['Correlations'] + 0.6 * (similar_users_df['Book-Rating'] / 10)) / 2

    similar_users_df.sort_values(by='Weighted Score',ascending=False)

    similar_users_df.groupby('User-ID').agg({'Weighted Score':'mean'})
    
    recommendation_df = similar_users_df.groupby('Book-Title').agg({'Weighted Score':'mean'}).reset_index()
    recommendation_df_by_score = recommendation_df[recommendation_df["Weighted Score"] > 0.40].sort_values(by='Weighted Score',ascending=False)
    recommendation_df_by_score = recommendation_df_by_score.merge(books, how='inner',on='Book-Title')

    recommended_list = recommendation_df_by_score.sort_values(by='Weighted Score',ascending=False).drop_duplicates(subset='Book-Title')['Book-Title'].head(10).to_list()
    print("\n\n\n-------The recommended list:----------\n",recommended_list,"\n\n")

    print(recommendation_df_by_score.columns,"\n\n")
    rdict ={}

    for index, row in recommendation_df_by_score.iterrows():
        rdict[row['Book-Title']] = row['URL']
    
    
    return rdict
    # recommended_list




# Creating user book matrix. usning the common books as the rare books are not considered as they would be user specific
def user_book_df(dataframe):
    #dataframe.drop(['Image-URL-S', 'Image-URL-M', 'Image-URL-L'], axis=1, inplace=True)
    dataframe.dropna(inplace=True)
    dataframe['User-ID'] = dataframe['User-ID'].astype('int')
    final_df = dataframe[dataframe["Book-Rating"] > 0]
    rating_book = pd.DataFrame(final_df['Book-Title'].value_counts())

    rare_books = rating_book[rating_book['Book-Title'] <= 85].index

    # if not in rare books, then title is in common books
    common_books = final_df[~final_df["Book-Title"].isin(rare_books)]
    # pivot table by the user ids for all common books => we get user book matrix with ratings which are given by different users to the books read by our user
    user_book_matrix = common_books.pivot_table(index=['User-ID'], columns=['Book-Title'], values='Book-Rating')
    return user_book_matrix


