import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS
} from '../constants/Page'

const initialState = {
  year: 2016,
  photos: [],
  loaded: false,
  id: 0
}

export default function page(state = initialState, action) {

  switch (action.type) {
	case GET_PHOTOS_REQUEST:
		return { ...state, year: action.payload, loaded: true }

	case GET_PHOTOS_SUCCESS:
		return { ...state, photos: action.payload, loaded: false, id: action.id }

    default:
      return state;
  }

}
