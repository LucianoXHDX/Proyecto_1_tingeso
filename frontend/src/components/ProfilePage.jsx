import {useKeycloak} from "@react-keycloak/web";

const ProfilePage = () => {
    const { keycloak } = useKeycloak();
    const token = keycloak.tokenParsed;

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            <h2>Mi Perfil</h2>
            <hr />
            <table className="table table-bordered">
                <tbody>
                <tr><th>Username</th><td>{token?.preferred_username}</td></tr>
                <tr><th>Email</th><td>{token?.email}</td></tr>
                <tr><th>Nombre</th><td>{token?.given_name}</td></tr>
                <tr><th>Apellido</th><td>{token?.family_name}</td></tr>
                </tbody>
            </table>

            <button className="btn btn-primary"
                    onClick={() => window.open(`http://localhost:9090/realms/spring-boot-realm-tingeso/account`, '_blank')}>
                Editar perfil en Keycloak
            </button>
        </div>
    );
};

export default ProfilePage;