import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { useRoute } from '../router'
import { authStateChangeUser } from '../redux/auth/authOperations'

const Main = ({ onLayout }) => {
  const { stateChange } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authStateChangeUser())
  }, [])

  const routing = useRoute(stateChange)

  return (
    <NavigationContainer onLayout={onLayout}>{routing}</NavigationContainer>
  )
}

export default Main
