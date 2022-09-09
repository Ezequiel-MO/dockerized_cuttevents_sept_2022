import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { toastOptions } from '../../../helper/toast'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import TextAreaInput from '../../../ui/inputs/TextAreaInput'

const AddScheduleAndIntroToProject = ({ project }) => {
  const navigate = useNavigate()
  const { currentProject, setCurrentProject } = useCurrentProject()
  const { projectIntro, hotels, schedule } = currentProject

  const handlePatchProject = async (intro) => {
    try {
      await baseAPI.patch(`/v1/projects/${project._id}`, {
        schedule,
        hotels,
        projectIntro: intro
      })

      setCurrentProject(project)
      toast.success('Project Completed, congratulations !!', toastOptions)
      setTimeout(() => navigate('/app/project/schedule'), 1000)
    } catch (error) {
      console.log(error)
    }
  }

  const initialValues = {
    introduction: projectIntro ?? ''
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handlePatchProject(values.introduction)
        }}
        enableReinitialize
      >
        {(formik) => (
          <div className='block rounded-lg shadow-lg bg-white w-full'>
            <Form>
              <TextAreaInput
                name='introduction'
                className='
                     form-control
                     h-52
                     block
                     w-full
                     px-3
                     py-1.5
                     text-base
                     font-normal
                     text-gray-700
                     bg-white bg-clip-padding
                     border border-solid border-gray-300
                     rounded
                     transition
                     ease-in-out
                     my-7
                     focus:text-gray-700 focus:outline-none
                   '
                placeholder={
                  projectIntro ??
                  'Write here an introduction for the whole project - that will be displayed in the top of the project page'
                }
                type='text'
              />
              <button
                className='h-12 mt-4 inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                type='submit'
              >
                Save Final Project
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  )
}

export default AddScheduleAndIntroToProject
