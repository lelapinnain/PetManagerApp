import React, { useState, useEffect } from 'react'
import { Button, Container, Alert, Col, Row, ButtonGroup } from 'react-bootstrap'
import PhotoCropper from './PhotoCropper'

import PhotoDropZone from './PhotoDropZone'

function ImageUploadWidget({ loading, setBlob }) {
  const [files, setFiles] = useState([])
  const [cropper, setCropper] = useState('')

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        setBlob(blob)
        console.log(blob)
      })
    }
  }

  //to dispose the files from memory
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <h4>'Add Photo'</h4>
          <PhotoDropZone setFiles={setFiles} />
        </Col>
        <Col xs={1} />
        <Col xs={3}>
          <h4>Resize image</h4>
          {files && files.length > 0 && <PhotoCropper setCropper={setCropper} imagePreview={files[0].preview} />}
        </Col>
        <Col xs={1} />
        <Col xs={3}>
          <h4>Upload</h4>
          {files && files.length > 0 && (
            <>
              <div className="img-preview" style={{ minHeight: 200, overflow: 'hidden' }} />
              {/* <Button.Group widths={2}>
                              <Button loading={loading} onClick={onCrop} positive icon='check' />
                              <Button disabled={loading} onClick={() => setFiles([])} icon='close' />
                          </Button.Group> */}
              <ButtonGroup aria-label="Basic example">
                <Button onClick={onCrop} variant="secondary">
                  <i className="fas fa-check"></i>
                </Button>
                <Button onClick={() => setFiles([])} variant="secondary">
                  <i className="fas fa-cancel"></i>
                </Button>
              </ButtonGroup>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ImageUploadWidget
