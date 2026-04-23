
        // MENU MOBILE
        const menuToggle = document.getElementById('mobile-menu');
        const navList = document.getElementById('nav-list');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });

        // FILTRO PORTFÓLIO
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-type') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // ENVIO FORMULÁRIO AJAX
        const form = document.getElementById("my-form");
        const status = document.getElementById("form-status");

        async function handleSubmit(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const btn = document.getElementById("submit-btn");

            btn.innerHTML = "Enviando...";
            btn.disabled = true;

            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                status.style.display = "block";
                if (response.ok) {
                    status.innerHTML = "Obrigado! Sua mensagem foi enviada com sucesso.";
                    status.style.backgroundColor = "rgba(34, 197, 94, 0.2)";
                    status.style.color = "#4ade80";
                    form.reset();
                    form.style.display = "none";
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "Ops! Ocorreu um problema ao enviar.";
                        }
                        status.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                        status.style.color = "#f87171";
                    })
                }
            }).catch(error => {
                status.style.display = "block";
                status.innerHTML = "Erro de conexão. Tente novamente mais tarde.";
                status.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
            }).finally(() => {
                btn.innerHTML = "Enviar Mensagem";
                btn.disabled = false;
            });
        }
        form.addEventListener("submit", handleSubmit);
   