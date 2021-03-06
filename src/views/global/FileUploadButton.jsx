import React, {useState} from "react";
import {Button, Input} from 'reactstrap'
import propTypes from 'prop-types'


const FileUploadButton = ({
                              fileElementId, color = 'primary', className, multiple, buttonText = '파일 선택', size = 'sm', selectedAction, block
                          }) => {
    return (
        <>
            <Input type='file' id={fileElementId} multiple={multiple} style={{display: 'none'}} onChange={() => {
                selectedAction()
            }}/>
            <Button color={color} className={className} onClick={() => {
                document.getElementById(fileElementId).click()
            }} size={size} block={block}>{buttonText}</Button>
        </>
    )
}

FileUploadButton.prototypes = {
    fileElementId: propTypes.string.isRequired,
    color: propTypes.string,
    className: propTypes.string,
    multiple: propTypes.bool,
}

export default FileUploadButton