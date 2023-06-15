import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import './CampaignForm.css'

// components
import NotificationMsg from '../NotificationMsg/NotificationMsg'

// icons
import { AiOutlineClose } from 'react-icons/ai'

// helper functions
import { convertToTimestamp } from '../../helpers/helper'
import { pinataSaveImage } from '../../helpers/pinataIPFS'

const categoryOptions = [
    { value: 'Education', label: 'Education' },
    { value: 'Medical', label: 'Medical' },
    { value: 'Business', label: 'Business' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Others', label: 'Others' },
]

const CampaignForm = ({ account, contract, web3 }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [errors, setErrors] = useState([]);
    const [createBtnVisibility, setCreateBtnVisibility] = useState(true);
    const [created, setCreated] = useState(false);

    const creatingBtnTextRef = useRef();
    const imgRef = useRef();
    const navigate = useNavigate();

    // form data
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amountRequired, setAmountRequired] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(0);
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreateBtnVisibility(false);
        let error = validateInputs();

        if (error) return

        /*
            save image on ipfs and set 'image' as url
            change deadline to timestamp
            convert amount required from ether to wei
        */

        let desc = description.replaceAll('\n', ' '); // remove \n
        let timestamp = convertToTimestamp(deadline); // convert date to timestamp

        let contributionInWei = web3.utils.toWei(amountRequired, 'ether');

        let url = await pinataSaveImage(imgRef.current.files[0]);

        const params = {
            title,
            desc,
            category,
            url,
            timestamp,
            contributionInWei
        }
       createCampaign(params);
    }

    async function createCampaign({ title, desc, category, url, timestamp, contributionInWei }) {
        try {
            await contract.methods.createCampaign(
                title,
                desc,
                category,
                url,
                timestamp,
                contributionInWei
            ).send({
                from: account,
                gas: '1000000' // max gas to use
            })
            creatingBtnTextRef.current.textContent = "Created";
            setCreated(true);
            window.location.reload()
            navigate("/")
        } catch (err) {
            console.warn(err)
        } 
    }

    const validateInputs = () => {
        let error
        if (title === "" || category === "" || amountRequired === "" ||
            description === "" || deadline === "" || image === "") {
            setErrors([...errors, 'Please fill all fields'])
            error = true
        }

        if (amountRequired < 0.5) {
            setErrors((prevErr) => [...prevErr, "Minimum contribution is 0.5 ether"])
            error = true
        }

        let currentDate = new Date();
        let givenDate = new Date(deadline); // input date

        const timeDiff = Math.abs(currentDate.getTime() - givenDate.getTime()); // difference in milliseconds
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // difference in days

        if (diffDays <= 2) {
            setErrors((prevErr) => [...prevErr, "Deadline must be greater than 2 days from now"])
            error = true
        }



        // limit array size
        if (errors.length > 3) {
            const newArray = errors.slice(0, 3); // create a new array with only the first three elements
            setErrors(newArray); // update the state with the new array
        }
        return error
    }

    const closeError = (index) => {
        const newErrors = [...errors];
        newErrors.splice(index, 1); // Remove 1 element at index 2
        setErrors(newErrors);
    }

    const customeTheme = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            text: "#fff",
            primary: '#EAB643',
            primary25: '#eab54347',
            primary50: 'none'
        },
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelected ? "#212529" : "#fff",
            backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        })
    })

    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: 'var(--primary)',
            marginTop: '5px',
            backgroundColor: 'transparent',
            "&:hover": {
                borderColor: 'var(--primary)'
            }
        }),
        menuList: base => ({
            ...base,
            backgroundColor: 'var(--bg2)',
            borderRadius: '5px'
        })
    }

    return (
        <>
            {created && <NotificationMsg content="New campaign created!"/>}
            <div className='form-errors'>
                {
                    errors.map((err, index) => {
                        return (
                            <div className='errors' id={index} key={index}>
                                <p className='error-msg text-overflow-hide'>
                                    {err}
                                </p>
                                <span className='close-errors' onClick={() => closeError(index)}>
                                    <AiOutlineClose />
                                </span>
                            </div>
                        )
                    })

                }
            </div>
            <form className='create-campaign-form'>
                <h1>Create A New Campaign</h1>
                <div className='form-page-1' style={currentPage === 1 ? { display: 'none' } : { display: 'block' }}>
                    <div className="input-section">
                        <label>Title</label>
                        <input
                            className='inputs'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required={true}
                        />
                    </div>

                    <div className="input-section">
                        <label>Category</label>
                        <Select
                            options={categoryOptions}
                            onChange={(opt) => setCategory(opt.value)}
                            theme={customeTheme}
                            styles={customStyles}
                        />
                    </div>

                    <div className="input-section">
                        <label>Amount Required (ETH)</label>
                        <input
                            className='inputs'
                            type="number"
                            value={amountRequired}
                            onChange={(e) => setAmountRequired(e.target.value)}
                            required={true}
                        />
                    </div>

                    <div className="input-section">
                        <label>Description</label>
                        <textarea
                            className='inputs'
                            cols="30"
                            rows="10"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required={true}
                        >
                        </textarea>
                    </div>
                </div>

                <div className='form-page-2' style={currentPage === 0 ? { display: 'none' } : { display: 'block' }}>
                    <div className="input-section">
                        <label>Deadline</label>
                        <input
                            className='inputs calendar'
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required={true}
                        />
                    </div>

                    <div className="input-section">
                        <label>Image</label>
                        <input
                            className='inputs'
                            type="file"
                            ref={imgRef}
                            accept='".jpg, .JPG, .jpeg, .JPEG, .png, .PNG'
                            // value={image!==null? image: ''}
                            onChange={(e) => {
                                setImage(imgRef.current.files)
                            }}
                            required={true}
                        />
                    </div>

                    <div className="submit-button-container">
                        {
                            createBtnVisibility?
                            <button
                                className='submit-btn'
                                onClick={handleSubmit}
                            >
                                <span>Create Campaign</span>
                            </button>
                            :
                            <button className="submit-btn" disabled={true}>
                                <span ref={creatingBtnTextRef}>Creating...</span>
                                {created && <span style={{ marginLeft: '5px' }}>&#10004;</span>}
                            </button>
                        }
                    </div>
                </div>

                <div className='form-pagination'>
                    <button
                        className='pagination-btn'
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(0)}
                    >
                        &lt; Prev
                    </button>
                    <button
                        className='pagination-btn'
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                    >
                        Next &gt;
                    </button>
                </div>
            </form>
        </>
    )
}

export default CampaignForm
