import React from 'react'
import { useState } from 'react';
// MUI | ANT-D :
import { Dropdown, Input, Form } from 'antd'
// ICONS
import { BiFilterAlt as FilterAltOutlinedIcon } from "react-icons/bi"
import { BsSearch as SearchIcon, BsFilter as FilterListOutlinedIcon } from "react-icons/bs"
import { MdOutlineExpandMore as ExpandMoreOutlinedIcon } from "react-icons/md"
import { AiOutlineClose as CloseOutlinedIcon } from "react-icons/ai"
import { IoMdAdd as AddOutlined } from "react-icons/io"

function Searchbar({ searchTeams }) {

    const [selectedSort, setSelectedSort] = useState("The newest");
    const [viewFilters, setViewFilters] = useState(false);

    const handleSortMenuClick = (e) => {
        setSelectedSort(e.key);
    }

    const handleSubmit = (data) => {
        let sortValue = {};
        // will test is it working?
        switch (selectedSort) {
            case "The newest":
                sortValue._id = -1;
                break;
            case "Highest Price":
                sortValue.price = -1;
                break;
            case "Lowest Price":
                sortValue.price = 1;
                break;
        }

        if (searchTeams) {
            searchTeams({ ...data, sort: sortValue })
        }
    }

    return (
        <div className="search-bar-wrapper">
            <Form onFinish={handleSubmit}>
                <div className="search-bar-container">
                    <div className="search-bar-item">
                        <div className='body'>
                            <div className="label">
                                <p> Search for Rides </p>
                            </div>
                            <div className="content">
                                <Form.Item name="search" rules={[{ required: true, message: "Search Keyword is required!" }]} rootClassName='search'>
                                    <Input type="search" placeholder='Search...' size='large' />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="search-bar-item">
                        <div className="icon">
                            <FilterListOutlinedIcon size={20} />
                        </div>
                        <div className='body'>
                            <div className="label">
                                <p> Sort By </p>
                            </div>
                            <div className="content">
                                <Dropdown
                                    trigger={["click"]}
                                    rootClassName='sort-dropdown'
                                    menu={{
                                        onClick: handleSortMenuClick,
                                        items: [
                                            {
                                                label: "The newest",
                                                key: "The newest",
                                            },
                                            {
                                                label: "Highest Price",
                                                key: "Highest Price",
                                            },
                                            {
                                                label: "Lowest Price",
                                                key: "Lowest Price",
                                            },
                                        ]
                                    }}
                                >
                                    <div className='sort-selector'>
                                        <div className="selected-item">
                                            {selectedSort}
                                        </div>
                                        <div className="dropdown-arrow">
                                            <ExpandMoreOutlinedIcon size={20} />
                                        </div>
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="search-bar-item">
                        <div className="icon">
                            <FilterAltOutlinedIcon size={20} />
                        </div>
                        <div className='body'>
                            <div className="label">
                                <p> Filters </p>
                            </div>
                            <div className="content">
                                <div className='filter-selector'>
                                    <div className={`filter-item${viewFilters ? "-close" : ""}`} onClick={() => setViewFilters(!viewFilters)}>
                                        {
                                            viewFilters ?
                                                "Remove Filters" :
                                                "View All Filters"
                                        }
                                    </div>
                                    <div className={`filter-arrow${viewFilters ? "-close" : ""}`} onClick={() => setViewFilters(!viewFilters)}>
                                        {
                                            viewFilters ?
                                                <CloseOutlinedIcon size={15} />
                                                :
                                                <AddOutlined size={15} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='icon'>
                            <button type='submit'>
                                <SearchIcon fontSize="large" />
                            </button>
                        </div>
                    </div>
                </div>
                {
                    viewFilters &&
                    <div className='filters-container'>
                        <div className="filter-item">
                            <div className="icon">
                                <p> Filter by </p>
                            </div>
                        </div>
                        <div className="filter-item">
                            <div className="body">
                                <Form.Item name="price" label="Price">
                                    <Input type='number' min="1" placeholder='Enter Max Price' size='large' />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                }
            </Form>
        </div>
    )
}

export default Searchbar
