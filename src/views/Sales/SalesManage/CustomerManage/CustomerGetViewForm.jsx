import React, {useState, useEffect, lazy} from "react";
import axios from "axios";
import {
    Col,
    FormGroup,
    Input,
    Label,
} from 'reactstrap'

export const CustomerGetViewForm = ({id}) => {
    const [state, setState] = useState({
        loading: true,
        tableData: []
    })

    useEffect(() => {
        const getAxios = async () => {
            await axios.get(`/client/unregistered/search?id=${id}`)
                .then(({data}) => {
                    setState({loading: false, tableData: data})
                })
                .catch(e => {
                    console.error(e);
                    setState({loading: false, tableData: state.tableData})
                })
        }
        getAxios();
    }, [])


    const handleSelectChange = (event) => {
        event.preventDefault();
        setState({target: event.target.value, ids: state.ids, loading: false, ItemList: state.ItemList})
    }

    const {age, name, sex,email, contact} = state.tableData

    return (

        <div className='flex-grow-1'>


                    <FormGroup row>
                        <input type='hidden' id='name' value={name}/>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>고객이름</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Input type='text' className='nanum-gothic' value={name} disabled/>
                        </Col>
                    </FormGroup>

            <FormGroup row>
                <input type='hidden' id='insuranceName' value={contact}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>연락처</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' value={contact} disabled/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <input type='hidden' id='age' value={age}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>연령</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' value={age} disabled/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <input type='hidden' id='insuranceName' value={sex}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>성별</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' value={sex} disabled/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <input type='hidden' id='insuranceName' value={email}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>email</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' value={email} disabled/>
                </Col>
            </FormGroup>

        </div>
    )
}

export default CustomerGetViewForm