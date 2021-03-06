import React, {lazy, Suspense, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Jumbotron, ListGroup, ListGroupItem, Row} from 'reactstrap'
import {useGetAxios} from '../global/useAxios'
import {connect} from 'react-redux'
import {loadAnnouncement} from "../../globalStore";
import Loading from "../global/Loading";
import AnnouncementReadForm from "./AnnouncementReadForm";
import {fileDownloadByFileName} from "../../utils";

const CustomizableTable = lazy(() => import('../global/CustomizableTable'))
const ReadContentModal = lazy(() => import('../global/ReadContentModal'))

const ImportantAnnouncement = ({data}) => {
    const {title, content, authorName} = data
    const [collapse, setCollapse] = useState(false)

    const switching = () => {setCollapse(!collapse)}

    return (
        <Card className='card-accent-primary'>
            <CardHeader><span className='my-auto nanum-gothic font-lg'><i
                className='fa fa-align-justify mr-2'/>중요 공지</span></CardHeader>
            <CardBody>
                <Jumbotron>
                    <h1 className="display-3 nanum-gothic">{title}</h1>
                    <div className='nanum-gothic font-lg'>
                        {content ? content.length > 50 ? `${content.split('. ')[0]}.` : content : null}
                    </div>
                    <ReadContentModal open={collapse} toggleFunc={switching} title={title} content={content}/>
                    <hr className="my-2"/>
                    <p className='nanum-gothic'>{authorName}</p>
                    <p className="lead">
                        <Button color="primary" className='nanum-gothic' onClick={switching}>자세히 보기</Button>
                    </p>
                </Jumbotron>
            </CardBody>
        </Card>
    )
}
let array = [false, false, false, false, false]
const FormCollection = () => {
    const openTarget = ['출장보고서', '재직증명서', '회의록', '발주서', '사직서']
    const [select, setSelect] = useState(-1)
    if (select >= 0)array[select] = true
    return (
        <Card className='card-accent-primary'>
            <CardHeader><span className='my-auto nanum-gothic font-lg'><i
                className='fa fa-align-justify mr-2'/>서식 모음</span></CardHeader>
            <CardBody>
                <ListGroup>
                    {
                        openTarget.map((target, idx) =>
                            <ListGroupItem tag="a" href="#" action key={idx}><h5 className='my-auto nanum-gothic'
                                                                                 onClick={(e) => {
                                                                                     e.preventDefault()
                                                                                     setSelect(idx)
                                                                                 }}>{target}</h5></ListGroupItem>
                        )
                    }
                </ListGroup>
                <ReadContentModal open={array[select] ? array[select] : false} toggleFunc={() => {
                    array[select] = false
                    setSelect(-1)
                }} title='파일을 다운로드 하시겠습니까?' addCancel confirmAction={() => fileDownloadByFileName({
                    url: 'document/download',
                    filename: openTarget[select] + '.hwp'
                })}
                                  content={`${openTarget[select] ? openTarget[select] : ''} 파일을 다운로드 하시겠습니까?`}
                                  size='md'/>

            </CardBody>
        </Card>
    )
}

const renderData = []
const Home = ({load, list}) => {
    useGetAxios({url: 'announcement/info', callback: load, necessary: !list});
    let important = list ? list instanceof Array ? list.find(({priority}) => priority) : list : null
    if (list && renderData.length === 0)
        list.forEach((item) => {
            const {id, title, date, authorName: author} = item
            renderData.push({id, title: {title, aTag: true, id}, date, author})
        })

    return (list ?
            <div className='animated fadeIn'>
                <Row>
                    <Col xs={12} md={6} xl={6}>
                        <ImportantAnnouncement data={important}/>
                    </Col>
                    <Col>
                        <FormCollection/>
                        <Suspense fallback={Loading()}>
                            <CustomizableTable tableRowData={renderData} tableTitle='공지 사항'
                                               retrieveForm={AnnouncementReadForm}/></Suspense>
                    </Col>
                </Row>
            </div> : <Loading/>
    )
}

const mapStateToProps = (state) => {
    const {announcement: {list} = {}} = state
    return list ? {list,} : {}
}

const mapDispatchToProps = (dispatch) => {
    return {load: (announcement) => dispatch(loadAnnouncement(announcement)),}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)