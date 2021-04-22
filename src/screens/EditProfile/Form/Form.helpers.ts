import { VAlID_IMAGES_TYPES } from 'constants/supportedFileTypes'
import * as yup from 'yup'

export interface EditProfileForm {
    displayName?: string
    customUrl?: string
    twitterUsername?: string
    personalSite: string
    email: string
    cover: File
    avatar: File
}

export const VALID_TYPES = VAlID_IMAGES_TYPES.replace('/image/gif', '')

/* TODO add validations here */
export const schema = yup.object().shape({
    price: yup
        .number()
        .required('You need to enter the price')
        .typeError('"Price" must be a number'),
    copiesCount: yup.number().typeError('You need to enter number'),
})
