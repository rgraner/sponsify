const initialState = [
    {
      name: 'Gold Plan',
      price: '99',
      benefits: [
        'Logo placement on website',
        'Social media promotion',
        'VIP event access',
      ],
    },
    {
      name: 'Silver Plan',
      price: '49',
      benefits: [
        'Logo placement on website',
        'Social media promotion',
      ],
    },
    {
      name: 'Bronze Plan',
      price: '19',
      benefits: [
        'Logo placement on website',
      ],
    },
];
  
  const plansReducer = (state = initialState, action) => {
    // You can handle actions and update state here (e.g., add, delete, or modify plans)
    return state;
  };
  
  export default plansReducer;