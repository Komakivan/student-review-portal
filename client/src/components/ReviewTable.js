import React,{ useState, useEffect } from 'react';
import axios from 'axios';


const ReviewTable = ({subject}) => {
    const [reviews, setReviews] = useState([])


    useEffect(() =>{
        (async () => {
            try {  
                const response = (await axios.get('http://localhost:8000/reviews')).data
                const fillteredReview = response.filter(review => review.subject === subject.name);
                setReviews(fillteredReview)
                console.log(fillteredReview)
            } catch (error) {
                console.log(error)
            }
        })();
    },[subject])


//    console.log(reviews.length)

    const descriptions = {
        1: 'Has The Teacher Covered The Entire Syllabus As Prescribed By University?',
        2: 'Has The Teacher Covered Relevant Topics Beyond The Syllabus',
        3: 'Technical Content/ Course Content',
        4: 'Communication Skills',
        5:'Use of teaching Aids',
        6: ' Pace On Which Contents Were Covered',
        7: 'Motivation And Inspiration For Students To Learn',
        8: 'Practical Demonstration',
        9: 'Hands-On Training',
        10: 'Clarity Of Expectation Of Students',
        11: 'Feedback Provided On Student’s Progress',
        12: 'Willingness To Offer Help And Advice To Students.'
    }


    const data = [
        {
        1:"Exellent - 20",
        2:"Good-5",
        3:"Exellent - 20",
        4:"Exellent - 20",
        5:"poor-0",
        6:"Exellent - 20",
        7:"Exellent - 20",
        8:"Very Good-15",
        9:"Exellent - 20",
        10:"Exellent - 20",
        11:"Exellent - 20",
        12:"Moderate-10"
        },
        {
            1:"Exellent - 20",
            2:"Good-5",
            3:"Exellent - 20",
            4:"poor-0",
            5:"poor-0",
            6:"Exellent - 20",
            7:"Exellent - 20",
            8:"Very Good-15",
            9:"Exellent - 20",
            10:"Exellent - 20",
            11:"Exellent - 20",
            12:"Moderate-10"
            }
      ];


      function countOccurrencesByKeyAndValues(data, key, values) {
        const count = {};
      
        values.forEach((value) => {
          count[value] = 0;
        });
      
        data.forEach((obj) => {
          const objValueForKey = obj[key];
          if (values.includes(objValueForKey)) {
            count[objValueForKey]++;
          }
        });
      
        return count;
      }
      
      const keyToCount = "1"; // Specify the key you want to count
      const valuesToCount = ['Exellent - 20', 'Very Good-15', 'Moderate-10', 'Good-5', 'poor-0']; // Specify the values you want to count
      
      const countResult = countOccurrencesByKeyAndValues(reviews, keyToCount, valuesToCount);

      const finale1 = countResult['Exellent - 20'] + countResult['Very Good-15'] + countResult['Moderate-10'] + countResult['Good-5'] + countResult['poor-0']

      const total = reviews.length
      console.log(countResult);

      
      // Function to count occurrences of "Exellent - 20" in an array of objects
// function countRates(data, rate) {
//     let count = 0;
  
//     data.forEach((obj) => {
//       Object.values(obj).forEach((value) => {
//         if (value === rate) {
//           count++;
//         }
//       });
//     });
  
//     return count;
//   }
  
//   const exell = countRates(reviews, 'Exellent - 20');
//   const veryGood = countRates(reviews,'Very Good-15');
//   const moderate = countRates(reviews,'Moderate-10');
//   const good = countRates(reviews,'Good-5')
//   const poor = countRates(reviews,'poor-0')

//   console.log(exell, veryGood, moderate, good, poor)
//   const total = exell*20 + veryGood*15 + moderate + good + poor
//   console.log(reviews.length)

  
    
    
    const countRate = (rate, num) => {
        let count = 0;
        reviews?.map((review) => {
            if(review[num] === rate ) {
                count = count + 1;
            }
        })

        localStorage.setItem(rate, count)

        return count;
    }

    
     
    

    
  return (
<div className="mt-8">
    <h3 className='text-center  text-blue-950 text-2xl pt-4'>{subject && subject.name}</h3>
	<table className="text-left border border-teal-800 w-full">
		<thead className="bg-slate-800 border flex text-white w-full">
			<tr className="flex w-full mb-4 text-center">
                <th className="p-4 w-1/4">No.</th>
                <th className="p-4 w-1/4">Description</th>
				<th className="p-4 w-1/4">Excellent(20)</th>
				<th className="p-4 w-1/4">Very good(15)</th>
				<th className="p-4 w-1/4">Moderate(10)</th>
				<th className="p-4 w-1/4">Good(5)</th>
                <th className="p-4 w-1/4">Poor(0)</th>
			</tr>
		</thead>

		<tbody className="bg-grey-light flex flex-col items-center text-center justify-between overflow-y-scroll w-full">
			<tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">1</td>
				<td className="p-4 text-xs w-1/4">{descriptions[1]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 1)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 1)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 1)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 1)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 1)}</td>
			</tr>

            <tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">2</td>
				<td className="p-4 text-xs w-1/4">{descriptions[2]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 2)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 2)}</td>
				<td className="p-4 w-1/4">{countRate('Moderate-10', 2)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 2)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 2)}</td>
			</tr>

            <tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">3</td>
				<td className="p-4 text-xs w-1/4">{descriptions[3]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 3)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 3)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 3)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 3)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 3)}</td>
			</tr>

            <tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">4</td>
				<td className="p-4 text-xs w-1/4">{descriptions[4]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 4)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 4)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 4)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 4)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 4)}</td>
			</tr>

            <tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">5</td>
				<td className="p-4 text-xs w-1/4">{descriptions[5]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 5)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 5)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 5)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 5)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 5)}</td>
			</tr>

            <tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">6</td>
				<td className="p-4 text-xs w-1/4">{descriptions[6]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 6)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 6)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 6)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 6)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 6)}</td>
			</tr>
			
            <tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">7</td>
				<td className="p-4 text-xs w-1/4">{descriptions[7]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 7)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 7)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 7)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 7)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 7)}</td>
			</tr>

			<tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">8</td>
				<td className="p-4 text-xs w-1/4">{descriptions[8]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 8)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 8)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 8)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 8)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 8)}</td>
			</tr>

			<tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">9</td>
				<td className="p-4 text-xs w-1/4">{descriptions[9]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 9)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 9)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 9)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 9)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 9)}</td>
			</tr>

            <tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">10</td>
				<td className="p-4 text-xs w-1/4">{descriptions[10]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 10)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 10)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 10)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 10)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 10)}</td>
			</tr>

            <tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">6</td>
				<td className="p-4 text-xs w-1/4">{descriptions[11]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 11)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 11)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 11)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 11)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 11)}</td>
			</tr>

            <tr className="flex w-full mb-4">
				<td className="p-4 w-1/4">12</td>
				<td className="p-4 text-xs w-1/4">{descriptions[12]}</td>
				<td className="p-4 w-1/4">{countRate('Exellent - 20', 12)}</td>
                <td className="p-4 w-1/4">{countRate('Very Good-15', 12)}</td>
                <td className="p-4 w-1/4">{countRate('Moderate-10', 12)}</td>
                <td className="p-4 w-1/4">{countRate('Good-5', 12)}</td>
                <td className="p-4 w-1/4">{countRate('poor-0', 12)}</td>
			</tr>
		</tbody>
	</table>
</div>
  )
}

export default ReviewTable
