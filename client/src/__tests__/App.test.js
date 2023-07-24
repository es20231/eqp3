import React from 'react';
import { render, screen } from '@testing-library/react'
import App from '../App'
import Home from '../Routes/Home';
import Private from '../Routes/Private';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

describe('Jest -> App', () => {
  it('should work', () => {
    expect(1).toBe(1)
  })

  it('should display elements', () => {
    render(<App />)

    expect(

      screen.getByRole('button', { name: /Entrar/i })
    ).toBeInTheDocument()
  })




  describe('App --> Home <--', () => {
    it('should login request and redirect to Dashboard', () => {
      render(
        <Router>
          <Home />
        </Router>
      )

      screen.debug();
      expect(

        screen.getByRole('button', { name: /Entrar/i })
      ).toBeInTheDocument()
    })
  })

  
  describe('App --> Private <--', () => {
    it('should open Private', () => {
      render(
        <Router>
          <Private />
        </Router>
      )

      screen.debug();
      expect(

        screen.getByRole('button', { name: /falta receber/i })
      ).toBeInTheDocument()
    })
  })



})