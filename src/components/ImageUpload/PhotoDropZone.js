import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Alert } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAppleWhole } from '@fortawesome/free-solid-svg-icons'

export default function PhotoWidgetDropzone({ setFiles }) {
  const dzStyles = {
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center',
    height: 90,
  }

  const dzActive = {
    borderColor: 'green',
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )

      // console.log(acceptedFiles)
    },
    [setFiles]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <div {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}>
        <input {...getInputProps()} />
        <i className="fas fa-plus"></i>
        {/* <Icon name='upload' size='huge' /> */}
        {/* <FontAwesomeIcon icon={faAppleWhole} size="lg" /> */}
      </div>
    </>
  )
}
