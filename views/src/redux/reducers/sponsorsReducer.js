// const initialState = [
//   { id: 1, name: 'Company A', logoUrl: '/images/companies-logo/sponsor_a.png' },
//   { id: 2, name: 'Company B', logoUrl: '/images/companies-logo/sponsor_b.png' },
//   { id: 3, name: 'Company C', logoUrl: '/images/companies-logo/sponsor_c.png' },
//   { id: 4, name: 'Company D', logoUrl: '/images/companies-logo/sponsor_d.png' },
//   { id: 5, name: 'Company E', logoUrl: '/images/companies-logo/sponsor_e.png' },
// ];

// Action Types:
const FETCH_SPONSORS_SUCCESS = 'FETCH_SPONSORS_SUCCESS';

// Action Creators
const fetchSponsorsSuccess = (sponsors) => ({
  type: FETCH_SPONSORS_SUCCESS,
  payload: sponsors,
});

// Async Action Creator
export const fetchSponsors = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/api/sponsors');
      const sponsors = await response.json();
      dispatch(fetchSponsorsSuccess(sponsors));
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      // Handle error actions if needed
    }
  };
};

// Initial State
const initialState = [];

// Reducer
const sponsorsReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify projects)
    switch (action.type) {
      case FETCH_SPONSORS_SUCCESS:
        return action.payload;
      // Handle other actions if needed
      default:
        return state;
    }
};

export default sponsorsReducer;