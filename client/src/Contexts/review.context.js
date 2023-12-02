import React, { createContext, useState, useContext } from 'react';


export const reviewContext = createContext({
    reviews: [],
    setReviews: () => null,
})


export const ReviewContextProvider = ({ children }) => {
    const [reviews, setReviews] = useState([])

    
    const values = { reviews, setReviews }

    return (
        <reviewContext.Provider value={values}>
            {children}
        </reviewContext.Provider>
    )
}



