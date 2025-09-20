<script setup>
// No navigation logic, just visual buttons for now
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <a href="#" class="nav-brand">NASA Space Explorer</a>
      <ul class="nav-menu">
        <li><button class="nav-link">APOD</button></li>
        <li><button class="nav-link">Mars Rovers</button></li>
        <li><button class="nav-link">Near Earth Objects</button></li>
        <li><button class="nav-link">EPIC Earth</button></li>
        <li><button class="nav-link">Earth Events</button></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--moon-white);
  text-decoration: none;
  background: linear-gradient(135deg, var(--nebula-blue), var(--plasma-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
}

.nav-link {
  background: none;
  border: none;
  color: var(--star-silver);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
}

.nav-link:hover {
  color: var(--moon-white);
  background: linear-gradient(135deg, var(--nebula-blue), var(--plasma-cyan));
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  transform: translateY(-2px);
}

.nav-link.active {
  color: var(--moon-white);
  background: linear-gradient(135deg, var(--nebula-blue), var(--plasma-cyan));
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 0.5rem;
  }

  .nav-menu {
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }

  .nav-brand {
    font-size: 1.1rem;
  }
}
</style>