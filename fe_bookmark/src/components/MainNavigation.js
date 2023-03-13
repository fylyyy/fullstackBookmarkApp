import { NavLink, useRouteLoaderData, Form } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const token = useRouteLoaderData('root')

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {token && <><li>
            <NavLink
              to="/bookmarks"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Bookmarks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bookmarks/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              New
            </NavLink>
          </li>
          <li>
            <Form action='/logout' method='post'>
              <button>Logout</button>
            </Form>
          </li>
          </>
          }
          
          {!token && <li>
            <NavLink
              to="/auth?mode=signin"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Login
            </NavLink>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
