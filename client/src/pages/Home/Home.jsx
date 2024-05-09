import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../constant';
import Navbar from '../../components/Navbar';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${BASE_URL}/registration`);
        if (data.success) {
          setData(data.data)
        } else {
          // alert("Error occured while fetching the data")
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }
    fetchData();
  }, [])

  return (
    <>
    <Navbar title={"Home"}/>
      <div className='bg-gray-100 min-h-screen pt-3'>
      <h2 className=" m-auto my-5 text-3xl font-bold text-center text-white w-[60%] bg-blue-500 py-2">
          REGISTRATION FORM VALIDATION TASK
        </h2>
        <div>
          <table className='w-screen text-center'>
            <thead className='bg-blue-500 h-14 text-lg '>
              <tr >
                <th>Sr No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody className='text-md font-medium'>
              {loading ? <tr><td colSpan={10}>loading please wait...</td></tr> :
                data && data?.length > 0 ?
                  data.map((item, index) => {
                    return (
                      <tr className='h-10 border border-blue-100 bg-gray-300'>
                        <td>{index + 1}</td>
                        <td>{item?.firstName || "N/A"}</td>
                        <td>{item?.lastName || "N/A"}</td>
                        <td>{item?.email || "N/A"}</td>
                        <td>{item?.country?.name || "N/A"}</td>
                        <td>{item?.state?.name || "N/A"}</td>
                        <td>{item?.city?.name || "N/A"}</td>
                        <td>{item?.gender || "N/A"}</td>
                        <td>{item?.dob?.split("T")[0] || "N/A"}</td>
                        <td>{item?.age || "N/A"}</td>
                      </tr>
                    )
                  }) :
                  <tr className='h-10'><td className='bg-red-400 text-white font-semibold text-center' colSpan={10}>No Data Found</td></tr>

              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home
