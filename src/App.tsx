import { DemoForm } from 'views'

import reactLogo from './assets/react.svg'
import './App.css'

/**
 * The root component of the application.
 *
 * @returns A React functional component that renders the application.
 */
export const App: React.FC = () => (
  <div className="App">
    <div>
      <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
      </a>
      <a href="https://reactjs.org" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <h1>Form Handler Sample</h1>
    <DemoForm />
  </div>
)
