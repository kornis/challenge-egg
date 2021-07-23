<h1>Challenge API Usuarios</h1>
<br>
<br>
<h4>Para ejecutar el proyecto</h4>
<br>
<ul>
    <li>Clonar el proyecto</li>
    <li>Crear archivo .env segun el archivo .env.example en la raiz del proyecto. (Usar los datos del .env.example para
        acceder a mi cuenta de pruebas de mongo)</li>
    <li>Ejecutar comando "npm install" para instalar dependencias.</li>
    <li>Una vez terminada la instalación, desde la consola, en la raiz del proyecto pueden ejecutar el comando "npm run
        dev" para correr el proyecto en modo desarrollo. El puerto por defecto es el 3000 pero se puede setear desde las
        variables de entorno</li>
</ul>
<br>
<br>
<h4>Endpoints</h4>
<br>
<ul>
    <li><strong>POST:</strong> /login</li>
    <ul>
        <li><strong>Body params:</strong></li>
        <li>email: string</li>
        <li>password: string</li>
    </ul>
    <li><strong>POST:</strong> /register</li>
    <ul>
        <li><strong>Body params:</strong></li>
        <li>email: string [unique]</li>
        <li>password: string</li>
        <li>nombre: string</li>
        <li>apellido: string</li>
        <li>dni: string</li>
    </ul>
    <li><strong>POST:</strong> /users/update</li>
    <ul>
        <li><strong>Body params:</strong></li>
        <li>nombre: string [opcional]</li>
        <li>apellido: string [opcional]</li>
        <li>dni: string [opcional]</li>
    </ul>
    <li><strong>POST:</strong> /users/createChild</li>
    <ul>
        <li><strong>Body params:</strong></li>
        <li>email: string [unique]</li>
        <li>password: string</li>
        <li>nombre: string</li>
        <li>apellido: string</li>
        <li>dni: string</li>
    </ul>
    <li><strong>POST:</strong> /users/listChildren</li>
    <li><strong>POST:</strong> /users/updateChild/:id <strong>[parametro :id]</strong></li>
    <ul>
        <li><strong>Body params:</strong></li>
        <li>nombre: string</li>
        <li>apellido: string</li>
        <li>dni: string</li>
    </ul>
    <li><strong>POST:</strong> /users/search/:dni <strong>[parametro :dni]</strong></li>
</ul>
<br>
<br>
<h4>Aclaraciones</h4>
<p>El endpoint de login devuelve un JWT el cual debe usarse como Bearer token en los headers de las peticiones para
    poder acceder a los distintos endpoints</p>
<p>Los usuarios Hijos no pueden modificar sus datos.</p>
<p>Cuando se registra un nuevo usuario, toma rol de padre y puede crear hijos.</p>
<p>Un usuario Padre, cuando crea un hijo debe indicar el email y password de acceso para esa cuenta</p>
<p>Los datos de usuario y contraseña se guardan en una coleccion llamada: "user-credentials", distinta a los datos de
    nombre, apellido y dni para no tener que consultar datos innecesarios cuando no corresponda. La colleccion "users"
    guarda el resto de los datos. Para relacionar una coleccion con otra, se guarda en el documento de "users" la key
    "credentials" con el id del documento en "user-credentials"</p>
<p>Si van a modificar los datos de un hijo, deben previamente obtener los datos del usuario logueado por medio del token
    para obtener los credentials de cada hijo (en la array key: children). Luego, usan un id de los listados como
    parametro del endpoint updateChild</p>
