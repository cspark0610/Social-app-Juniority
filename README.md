JUNIORITY SOCIAL APP


    Información

        Juniority es una plataforma social de publicaciones que permite conectar a developers juniors con empresas. Los usuarios se pueden registrar tanto como user o como company. Ambos pueden postear publicaciones (ya sea en formato texto, código, video o imagen), actualizar perfiles individuales, publicar ofertas de trabajo y cursos; e intercambiar mensajes por una sala de chat. Para el deploy, seguir los pasos que se indican en la  documentacion de Firebase (https://firebase.google.com/docs/hosting).

    Tecnologias

        ReactJs, Firebase, Redux toolkit, CSS, Material-UI 

    Uso

        La App se levanta primero instalando las dependencias con npm install y luego haciendo npm start (el proyecto se levantara en localhost :3000). Para el back se debe levantar un proyecto en firebase, copiar y pegar el firebaseConfig en el archivo firebase/firebase.js.

    Organización de carpetas
        ├── /public
        ├── /src
        ├── .gitignore
        ├── package-lock.json
        └── package.json

        ├── src
        │   ├── /componentes
        │   ├── /firebase
        │   ├── /store
        │   ├── App.css
        │   │── App.js  
        │   │── index.css  
        │   |── index.js 
        |   ├── indexStyle.js
   
    Rutas

        La aplicación tiene un set de rutas ya definido para hacer la página navegable.

            *  /: la ruta de home que tiene un input para hacer la búsqueda de posts y que muestra el feed de posteos ordenados cronológicamente.

            *  /jobs  muestra el formulario para postear una oferta de trabajo y filtrar mediante un input por keyword y mediante un widget de filtros por categorías . A su vez renderiza todos las ofertas publicadas cronológicamente.

            *  /connections  muestra los seguidos y los seguidores de un usuario en particular.

            *  /courses  muestra el formulario para postear un curso y filtrar mediante un input por keyword . A su vez renderiza todos las ofertas de cursos cronológicamente.

            *  /chat/:roomId     muestra un listado de mensajes de chat  entre dos usuarios.

            *  /profile/:id va a mostrar el perfil del usuario con info personal editable.

            *  /porfolio va a mostrar el portfolio personal del usuario con info de cada proyecto.
            Lista de funcionalidades. 

    Con la App podremos:

        *  Buscar ofertas de trabajo y cursos y filtrarlas.

        *  Poder ver el feed de todos los posteos en la home y de todas las ofertas de trabajo y de cursos en /jobs y /courses.

        *  Poder aplicar a una oferta de trabajo subiendo tu CV como pdf.

        *  Poder crear una publicación como texto y poder agregar código, imagen y  video.

        *  Poder comentar una publicación ya sea en formato texto o código, likearla, y poderla compartir en otras redes sociales (WhatApp, Linkedin, Twitter, Facebook)

        *  Poder seguir o ser seguido entre distintos usuarios (sistema de following followers).

        *  Poder ver en /connections quienes son mis seguidores y a quienes sigo teniendo también la posibilidad de dejar de seguir o de eliminar a un seguidor.

        *  Crear usuarios a través de correo de mail. 

        *  Logearse con un usuario mediante 3AuthParty Gmail y Github o a través de correo de mail.

        *  Poder registrarse como User o Company.

        *  Poder recuperar mi contraseña.

        *  Ver el perfil de un usuario en particular con información: acerca de, experiencia y educación y de porfolio de proyectos individuales. 

        *  Poder editar la información de perfil individual en /profile/:id.

        *  Poder agregar proyectos en mi portfolio personal.

        *  Poder intercambiar mensajes con otro usuario en particular mediante un ChatRoom.
