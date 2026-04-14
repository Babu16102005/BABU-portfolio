import { act, render, screen } from '@testing-library/react';
import App from './App';

test('shows the named loader status during initial load', () => {
  render(<App />);

  expect(screen.getByRole('status', { name: /site loader/i })).toBeInTheDocument();
});

test('hides the app tree from assistive technology during initial load', () => {
  const { container } = render(<App />);

  const appTree = container.querySelector('.App');

  expect(appTree).toHaveAttribute('aria-hidden', 'true');
  expect(appTree).toHaveAttribute('inert', '');
  expect(screen.queryByRole('heading', { name: /About Me/i })).not.toBeInTheDocument();
});

test('dismisses the loader after the timeout and exposes the app tree', () => {
  vi.useFakeTimers();

  try {
    const { container } = render(<App />);
    const appTree = container.querySelector('.App');

    act(() => {
      vi.advanceTimersByTime(1800);
    });

    expect(screen.queryByRole('status', { name: /site loader/i })).not.toBeInTheDocument();
    expect(appTree).not.toHaveAttribute('aria-hidden');
    expect(appTree).not.toHaveAttribute('inert');
    expect(screen.getAllByText(/Hi, I'm/i).length).toBeGreaterThan(0);

    const homeSection = container.querySelector('#home');

    expect(homeSection).toBeInTheDocument();
    expect(homeSection.querySelector('.hyper-kinetic-hero .brutal-nav')).toBeInTheDocument();
    expect(homeSection.querySelectorAll('.hyper-kinetic-hero .hero h1 .word')).toHaveLength(2);
    expect(homeSection.querySelector('.hyper-kinetic-hero .tape-wrapper .tape-text')).toHaveTextContent(/scroll velocity/i);
    expect(homeSection.querySelector('.fluid-reveal-image .image-frame')).toBeInTheDocument();
    expect(homeSection.querySelector('.fluid-reveal-image .image-top img')).toHaveAttribute('src', '/babu_image.jpg');

    expect(screen.getByRole('heading', { name: /About Me/i })).toBeInTheDocument();
    expect(container.querySelector('#about .text-fill-on-scroll .js-fill > span')).toHaveTextContent(/currently focused on Full Stack Development/i);
    expect(screen.getByRole('heading', { name: /My Skills/i })).toBeInTheDocument();
    expect(container.querySelector('#skills .animated-skills-background .large-header')).toBeInTheDocument();
    expect(container.querySelector('#skills .animated-skills-background canvas')).toBeInTheDocument();
    expect(container.querySelector('#skills .animated-skills-background .main-title')).toHaveTextContent(/My Skills/i);
    expect(screen.getByRole('heading', { name: /Some Things I've Built/i })).toBeInTheDocument();
    expect(container.querySelector('#projects .webgl-scroll-sync .webgl-canvas')).toBeInTheDocument();
    expect(container.querySelector('#projects .webgl-scroll-sync .hud')).toHaveTextContent(/000%/i);
    expect(container.querySelectorAll('#projects .webgl-scroll-sync .scene-dot')).toHaveLength(4);
    expect(container.querySelectorAll('#projects .webgl-scroll-sync .project-scene')).toHaveLength(4);
    expect(container.querySelector('#projects .webgl-scroll-sync .project-scene')).toHaveTextContent(/Smart Mentis/i);
    expect(screen.getByRole('heading', { name: /My Credentials/i })).toBeInTheDocument();
    expect(container.querySelector('#credentials .hyper-scroll-scene .viewport .world')).toBeInTheDocument();
    expect(container.querySelector('#credentials .hyper-scroll-scene .hud')).toHaveTextContent(/scroll velocity/i);
    expect(container.querySelectorAll('#credentials .hyper-scroll-scene .item')).toHaveLength(20);
    expect(container.querySelectorAll('#credentials .hyper-scroll-scene .big-text')).toHaveLength(5);
    expect(container.querySelectorAll('#credentials .hyper-scroll-scene .card')).toHaveLength(15);
    expect(container.querySelector('#credentials .hyper-scroll-scene .card')).toHaveTextContent(/Paper Presentation/i);
    expect(screen.getAllByTestId('project-card')).toHaveLength(4);
  } finally {
    vi.useRealTimers();
  }
});
