import { newSpecPage } from '@stencil/core/testing';
import { LdesignButton } from './button';

describe('ldesign-button', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [LdesignButton],
      html: `<ldesign-button>Click me</ldesign-button>`,
    });

    expect(page.root).toBeTruthy();
    expect(page.root?.textContent).toBe('Click me');
  });

  it('should render with primary type', async () => {
    const page = await newSpecPage({
      components: [LdesignButton],
      html: `<ldesign-button type="primary">Primary</ldesign-button>`,
    });

    const button = page.root?.querySelector('button');
    expect(button?.classList.contains('ldesign-button--primary')).toBe(true);
  });

  it('should be disabled', async () => {
    const page = await newSpecPage({
      components: [LdesignButton],
      html: `<ldesign-button disabled>Disabled</ldesign-button>`,
    });

    const button = page.root?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
  });

  it('should emit click event', async () => {
    const page = await newSpecPage({
      components: [LdesignButton],
      html: `<ldesign-button>Click me</ldesign-button>`,
    });

    const clickSpy = jest.fn();
    page.root?.addEventListener('ldesignClick', clickSpy);

    const button = page.root?.querySelector('button');
    button?.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not emit click when disabled', async () => {
    const page = await newSpecPage({
      components: [LdesignButton],
      html: `<ldesign-button disabled>Disabled</ldesign-button>`,
    });

    const clickSpy = jest.fn();
    page.root?.addEventListener('ldesignClick', clickSpy);

    const button = page.root?.querySelector('button');
    button?.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should render loading state', async () => {
    const page = await newSpecPage({
      components: [LdesignButton],
      html: `<ldesign-button loading>Loading</ldesign-button>`,
    });

    const icon = page.root?.querySelector('.ldesign-button__icon--loading');
    expect(icon).toBeTruthy();
  });

  it('should render with icon', async () => {
    const page = await newSpecPage({
      components: [LdesignButton],
      html: `<ldesign-button icon="check">With Icon</ldesign-button>`,
    });

    const icon = page.root?.querySelector('ldesign-icon');
    expect(icon).toBeTruthy();
  });
});




