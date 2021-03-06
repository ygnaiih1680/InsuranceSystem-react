import React, {Suspense, useState} from "react";
import {
    Button,
    Form,
    Modal,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import Loading from "./Loading";
import FileUploadButton from "./FileUploadButton";
import CustomizableModalHeader from "./CustomiableModalHeader";

const GenerateDocumentModal = ({modalTitle, buttonTitle = '보고서 작성하기', className, uploadAction, inputForm: InputForm, fileUpload, fileElementId}) => {
    const [modalOpen, setModalOpen] = useState(false)

    const modalControl = () => {
        setModalOpen(!modalOpen)
    }

    const action = () =>{
        return(
            <div><h3>잘 확인하셨나요?</h3>
            </div>

        )
    }

    return (
        <>
            <Button color="primary" onClick={modalControl} className="ml-auto" size='sm'><i
                className='fa fa-upload mr-1'/>{buttonTitle}</Button>
            <Modal isOpen={modalOpen} toggle={modalControl}
                   className={'modal-lg ' + className} backdrop={'static'}>
                <Form onSubmit={(e) => uploadAction(e, modalControl)}>
                    <CustomizableModalHeader title={modalTitle}/>
                    <ModalBody>
                        <Suspense fallback={Loading()}>
                            {InputForm}
                        </Suspense>
                    </ModalBody>
                    <ModalFooter>
                        {fileUpload ? <FileUploadButton fileElementId={fileElementId} selectedAction={()=>action()}
                                                        size='md' className='mr-auto'/> : null}
                        <Button type='submit' color="primary">등록</Button>{' '}
                        <Button color="secondary" onClick={modalControl}>취소</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}

export default GenerateDocumentModal