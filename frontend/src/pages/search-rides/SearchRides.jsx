import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchRides } from '../../redux/slices/RideSlice';
import RideCard from '../../Components/cards/cards';
import Searchbar from './Searchbar';
import { Space, Spin, Row, Col } from 'antd';
import "./SearchRides.scss"

const SearchProducts = () => {


    const dispatch = useDispatch();
    const { searchResults, loading } = useSelector(state => state.ride);

    useEffect(() => {
        handleSearcchRides({ search: "", sort: { _id: -1 } });
    }, []);


    const handleSearcchRides = (data) => {
        dispatch(searchRides(data))
    }

    return (
        <section style={{ backgroundColor: "#eee", padding: "20px",}}>
            <Searchbar searchTeams={handleSearcchRides} />
            <div style={{ backgroundColor: "white", padding: "20px", minHeight: "70vh", borderRadius: "10px" }}>
                <Row gutter={20}>
                    {
                        loading ?
                            <Space align='center' style={{ width: "100%", justifyContent: "center", paddingTop: "40px" }}>
                                <Spin size='large' tip="Searching Results" />
                            </Space>
                            :
                            searchResults?.map((el, i) => (
                                <Col xs={24} sm={12} md={6} lg={6}>
                                    <RideCard {...el} />
                                </Col>
                            ))
                    }
                </Row>
            </div>
        </section>
    )
}

export default SearchProducts
