import Link from "next/link";

export const Menu: React.FC = () => {
    return(
        <aside className="col-12 col-md-3 col-lg-2 mb-4 mb-md-0">
          <div className="bg-light border rounded p-3 h-100">
            <h5 className="mb-3">NX Software</h5>
            <ul className="nav flex-column">
              <MenuItem href="/" label="Home"/>
              <MenuItem href="/dashboard/itens" label="Itens"/>
            </ul>
          </div>
        </aside>
    )
}

interface MenuItemProps {
    href: string;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
    return (
        <li className="nav-item">
            <Link href={props.href} className="nav-link px-0">              
                {props.label}        
            </Link>
        </li>    
    )
}