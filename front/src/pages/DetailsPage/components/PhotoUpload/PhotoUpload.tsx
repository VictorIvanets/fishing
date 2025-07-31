import Flex from "src/components/Flex/Flex"
import "./photoupload.sass"
import Button from "src/components/Button/Button"
import type { OneFishingT } from "src/types/fishing"
import { IoImages } from "react-icons/io5"
import { MdOutlineTouchApp } from "react-icons/md"
import { useState } from "react"
import useUploadPhoto from "src/hooks/useUploadPhoto"
import { FaArrowRight } from "react-icons/fa"
interface CkeckDeleteProps {
  data: OneFishingT
  setUploadPhoto: React.Dispatch<React.SetStateAction<boolean>>
}

const PhotoUpload = ({ data, setUploadPhoto }: CkeckDeleteProps) => {
  const [files, setFiles] = useState<File[] | null>(null)
  const [errorUpload, setErrorUpload] = useState<string | null>(null)
  const { uploadPhoto } = useUploadPhoto(data._id)

  function handleMultipleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setErrorUpload(null)
    setFiles(null)
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : []
    if (
      selectedFiles[0] &&
      selectedFiles[0].type !== "image/jpeg" &&
      selectedFiles[0].type !== "image/png"
    ) {
      setErrorUpload("Файл має бути у форматі JPEG або PNG")
      return
    }
    setFiles(selectedFiles)
  }

  async function handleMultipleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData()
    if (
      files &&
      files[0] &&
      files[0].type !== "image/jpeg" &&
      files[0].type !== "image/png"
    ) {
      setErrorUpload("Файл має бути у форматі JPEG або PNG")
      return
    }
    if (files) {
      files.forEach((file: File) => {
        formData.append("files", file, file.name)
      })
      try {
        await uploadPhoto({ _id: data._id, formData })
        setFiles([])
        setUploadPhoto(false)
      } catch (error: any) {
        setErrorUpload(error?.response?.data?.message || error?.message)
      }
    } else {
      setErrorUpload("ВИБЕРІТЬ ФОТО")
    }
  }

  return (
    <Flex column gap={10} centerV spredV className="photoupload">
      <Flex center column>
        <h2>Завантажити фото</h2>
        <p>для запису:</p>
        <h4> {data.title}</h4>
      </Flex>
      <form onSubmit={handleMultipleSubmit} className="photoupload__form">
        <label htmlFor="upload" className="photoupload__label">
          <h1>
            <FaArrowRight className="glow" />
            <IoImages className="glow" />
            <MdOutlineTouchApp className="glow" />
          </h1>
        </label>
        <input
          className="photoupload__input"
          name="upload"
          id="upload"
          type="file"
          multiple
          onChange={handleMultipleChange}
        />

        <Flex gap={50}>
          <Button
            onClick={() => setUploadPhoto(false)}
            appearence="big"
            title="Відміна"
            type="button"
          />
          {files && (
            <Button type="submit" appearence="big" title="Завантажити" />
          )}
        </Flex>
      </form>

      <Flex relativ className="photoupload__imagebox">
        {files &&
          files.map((file: File, index: number) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
            />
          ))}
        {errorUpload && (
          <Flex absolute flex center>
            <h4>{errorUpload}</h4>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default PhotoUpload
