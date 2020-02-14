from sklearn.neighbors import KNeighborsRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd
from csv import reader


if __name__ == "__main__":
    #prep data
    data = pd.read_csv('data.csv')
    
    def clean_dataset(df):
        assert isinstance(df, pd.DataFrame), "df needs to be a pd.DataFrame"
        df.dropna(inplace=True)
        indices_to_keep = ~df.isin([np.nan, np.inf, -np.inf]).any(1)
        return df[indices_to_keep].astype(np.float64)
    
    df = pd.DataFrame(data)
    # print(df.head(10))
    clean_dataset(df)
    # print("Data types and their frequency\n{}".format(df.isnull().sum()))

    X, y = df[['maths','phy','chem','mech','bee','workshop']], df['sgpa']
    # print(X)
    X_train, X_test, y_train, y_test = train_test_split(X, y)
    # print(X_train)
    # init brain
    model = LinearRegression(normalize=True)
    print(model.fit(X_train, y_train))

    prediction = model.predict([[57,52,55,57,56,40]])

    print(prediction)
