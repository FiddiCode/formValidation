import React, { useEffect, useState } from 'react'

import axios from "axios";

import { toast } from "react-toastify";

import { CiSquarePlus } from "react-icons/ci";
import { ImCross } from "react-icons/im";

import { BASE_URL } from '../../constant';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [showPopup, setShowPopup] = useState({ type: "", status: false });
  const [newItem, setNewItem] = useState({ name: "" })
  const [selectedId, setSelectedId] = useState("");

  console.log("id", selectedId);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    age: 0,
    gender: "",
    country: "",
    state: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    country: "",
    state: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const age = calculateAge(value);
      setFormData({
        ...formData,
        dob: value,
        age
      })
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors({
      ...errors,
      [name]: ""
    })


  };


  const handlePopup = (type, status) => {
    setShowPopup({ type, status })
    setSelectedId("")

  }

  const handleNewItem = (e) => {
    const { value } = e.target;
    setNewItem({ name: value });
  }

  const handleCreateNew = async (type) => {

    if (type === "city") {
      const submitData = {
        name: newItem.name,
        state: selectedId
      }
      const { data } = await axios.post(`${BASE_URL}/city`, submitData);
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    }
    if (type === "state") {
      const submitData = {
        name: newItem.name,
        country: selectedId
      }
      const { data } = await axios.post(`${BASE_URL}/state`, submitData);
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    }

    setNewItem({
      name: ""
    })

    setShowPopup({ type: "", status: false });
  }

  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key]
      ) {
        newErrors[key] = `Mandatory field`;
        isValid = false
      }
    });

    if (!formData.firstName.trim() || !/^[A-Za-z ]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = 'Please enter a valid first name without numbers, symbols';
      isValid = false;
    }

    if (!formData.lastName.trim() || !/^[A-Za-z ]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = 'Please enter a valid last name without numbers, symbols';
      isValid = false;
    }


    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }


    const dobDate = new Date(formData.dob);
    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);

    if (dobDate > minAgeDate) {
      newErrors["dob"] = "Minimum age should be 18 years";
      isValid=false
    }
    
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 100);

    if (dobDate < maxDate) {
      newErrors["dob"] = "Maximum age exceeded";
      isValid=false
    }


    setErrors(newErrors);
    console.log("errors", newErrors);

    // return Object.keys(newErrors).length === 0;
    return isValid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      console.log("not valid");
      return;
    }

    // const formDataToSend = new FormData();

    // Object.entries(formData).forEach(([key, value]) => {
    //   formDataToSend.append(key, value);
    // });

    try {
      const { data } = await axios.post(
        `${BASE_URL}/registration`,
        formData
      );
      if (data.success) {

        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          age: "",
          gender: "",
          country: "",
          state: "",
          city: "",
        });
        setErrors({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          age: "",
          gender: "",
          country: "",
          state: "",
          city: "",
        });
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error:", error?.response?.data.message);
      toast.error(error?.response?.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {

    const fetchCountries = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/country`);
        if (data.success) {
          setCountry(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      }

    }
    fetchCountries()
  }, [formData.state, formData.city])

  useEffect(() => {

    const fetchState = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/state?country=${formData.country}`);
        if (data.success) {
          setState(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      }

    }
    fetchState()
  }, [formData.country])

  useEffect(() => {

    const fetchCity = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/city?state=${formData.state}`);
        if (data.success) {
          setCity(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      }

    }
    fetchCity()
  }, [formData.state])


  return (
    <>
      <Navbar title={"Registration Form"} />
      <div className='bg-gray-100 min-h-screen'>
        <div className="flex justify-center">
          <h2 className="my-5 text-3xl font-bold text-center text-white w-full bg-blue-500 py-2">
            REGISTRATION FORM
          </h2>
        </div>
        <form className="m-auto mt-3   w-[80%]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name here.."
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-600"
              >
                Last Name
              </label>
              <input
                placeholder="Enter your last name here.."
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>



            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-sm font-semibold text-gray-600"
              >
                Date of Birth
              </label>
              <div className="flex">
                <input
                  placeholder="Date of Birth"
                  type="text"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-semibold text-gray-600"
              >
                Age
              </label>
              <div className="flex">
                <input
                  placeholder="Age"
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600"
              >
                Email
              </label>
              <input
                placeholder="ex:myname@example.com"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-semibold text-gray-600"
              >
                Gender
              </label>
              <div className='flex justify-between items-center h-12'>
                <div className='flex justify-start items-center '>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-semibold text-gray-600 mr-2"
                  >
                    Male
                  </label>
                  <input
                    placeholder="ex:myname@example.com"
                    type="radio"
                    id="gender"
                    name="gender"
                    value="male"
                    onChange={handleInputChange}
                  // className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className='flex justify-start items-center '>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-semibold text-gray-600 mr-2"
                  >
                    Female
                  </label>
                  <input
                    placeholder="ex:myname@example.com"
                    type="radio"
                    id="gender"
                    name="gender"
                    value="female"
                    onChange={handleInputChange}
                  // className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className='flex justify-start items-center '>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-semibold text-gray-600 mr-2"
                  >
                    Other
                  </label>
                  <input
                    placeholder="ex:myname@example.com"
                    type="radio"
                    id="gender"
                    name="gender"
                    value="other"
                    onChange={handleInputChange}
                  // className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-semibold text-gray-600 mb-2"
              >
                Country
              </label>
              <select id='country'
                name='country'
                value={formData.country}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value={""}>Select the country</option>
                {
                  country?.length > 0 ? country.map((item, index) => {
                    return (
                      <option key={index} value={item?._id}>{item?.name}</option>
                    )
                  }) : <option>Data not found</option>
                }
              </select>

              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-semibold text-gray-600 mb-2"
              >
                State
              </label>
              <div className='flex justify-between items-center'>
                <select id='state'
                  name='state'
                  value={formData.state}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value={""}>Select the State</option>
                  {
                    state?.length > 0 ? state.map((item, index) => {
                      return (
                        <option key={index} value={item?._id}>{item?.name}</option>
                      )
                    }) : <option>Data not found</option>
                  }
                </select>
                <CiSquarePlus onClick={() => handlePopup("state", true)} className='w-10 h-10 text-gray-400 hover:text-[#1b3a59] hover:cursor-pointer' />
              </div>
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}

            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-semibold text-gray-600 mb-2"
              >
                City
              </label>
              <div className='flex justify-between items-center'>
                <select id='city'
                  name='city'
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value={""}>Select the city</option>
                  {
                    city?.length > 0 ? city.map((item, index) => {
                      return (
                        <option key={index} value={item?._id}>{item?.name}</option>
                      )
                    }) : <option>Data not found</option>
                  }
                </select>
                <CiSquarePlus onClick={() => handlePopup("city", true)} className='w-10 h-10 text-gray-400 hover:text-[#1b3a59] hover:cursor-pointer' />
              </div>
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

            </div>

          </div>

          <div className="flex justify-center items-center mb-9 mt-3">
            <button
              type="submit"
              className="bg-blue-500 text-white text-2xl py-2 px-[100px] hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
          <p className='text-sm text-blue-500 font-medium '>Note- If state,city not found w.r.t to country then first select the country and click add button to add state and city </p>
        </form>
        {showPopup.status &&
          <div onClick={() => handlePopup("", false)} className='w-screen h-screen fixed top-0 left-0 bg-[rgb(0,0,0,0.5)] z-10'>
            <div onClick={(e) => e.stopPropagation()} className='bg-gray-100 rounded w-1/2 min-h-1/3 shadow-lg absolute top-[25%] left-[25%]'>
              <ImCross onClick={() => handlePopup("", false)} className='text-red-500 m-3 float-right cursor-pointer' />
              <div className='flex flex-col justify-center items-center w-full h-[80%]'>
                <div className='flex flex-col m-2  w-4/5'>
                  <label className='font-semibold text-lg m-2 align-left' >Enter {showPopup.type}</label>
                  {/* <div  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" > */}
                  <input className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" type='text' value={newItem.name} onChange={handleNewItem} />
                  {/* </div> */}
                </div>
                <div className='flex flex-col m-2  w-4/5'>
                  <label className='font-semibold text-lg m-2 align-left' >Select {showPopup.type === "state" ? "Country" : "State"}</label>
                  {
                    <select
                      value={selectedId}
                      onChange={(e) => setSelectedId(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    >
                      <option value={""}>Select the {showPopup.type === "state" ? "Country" : "State"}</option>
                      {showPopup.type === "state" ?
                        country?.length > 0 ? country.map((item, index) => {
                          return (
                            <option key={index} value={item?._id}>{item?.name}</option>
                          )
                        }) : <option>Data not found</option>
                        :
                        state?.length > 0 ? state.map((item, index) => {
                          return (
                            <option key={index} value={item?._id}>{item?.name}</option>
                          )
                        }) : <option>Data not found</option>
                      }
                    </select>
                  }
                </div>
                <div className='flex justify-between items-center w-[70%]'>
                  {/* <button onClick={()=>handleCreateNew(showPopup.type)} className='rounded bg-green-400 text-white px-3 py-1 font-semibold m-3 mx-6 text-lg'>Save</button> */}
                  <button
                    onClick={() => handleCreateNew(showPopup.type)}
                    className="rounded bg-green-400 text-white px-3 py-1 font-semibold m-3 mx-6 text-lg shadow"
                  >
                    {/* {showPopup.type === 'city' ? (
                  isCityLoading ? (
                    <BeatLoader color="#ffffff" loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                  ) : (
                    'Save'
                  )
                ) : isStateLoading ? (
                  <BeatLoader color="#ffffff" loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                ) : ( */}
                    Save
                    {/* )} */}
                  </button>

                  <button onClick={() => handlePopup("", false)} className='shadow rounded bg-red-400 text-white px-3 py-1 font-semibold m-3 mx-6 text-lg'>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

    </>
  )
}

export default Form