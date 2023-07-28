import React from 'react'
import { useState } from 'react';
// MUI | ANT-D :
import { Dropdown, Input, Form, Select, Row, Col } from 'antd'
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
                    <Row gutter={20} style={{marginTop: "30px"}}>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <Form.Item name="price" label="Price Range">
                                <Input type='number' min="1" placeholder='Enter Max Price' size='large' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <Form.Item name="date" label="Date">
                                <Input type='date' min="1" size='large' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <Form.Item name="location" label="Location">
                                <Input type='text' min="1" size='large' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <Form.Item name="rideType" label="Ride Type">
                                <Select
                                    size='large'
                                >
                                    <Select.Option name="car"> Car </Select.Option>
                                    <Select.Option name="bike"> Bike </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                }
            </Form>
        </div>
    )
}

export default Searchbar
