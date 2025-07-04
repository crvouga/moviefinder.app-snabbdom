export const QueryParam = (name: string) => {
  const get = () => {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  };
  return {
    get,
    set: (value: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set(name, value);
      window.history.pushState({}, "", url.toString());
      window.dispatchEvent(new Event("popstate"));
    },
    subscribe: (onChange: (value: string | null) => void) => {
      window.addEventListener("popstate", () => {
        onChange(get());
      });
      window.addEventListener("hashchange", () => {
        onChange(get());
      });
      window.addEventListener("load", () => {
        onChange(get());
      });
      return () => {
        window.removeEventListener("popstate", () => onChange(get()));
        window.removeEventListener("hashchange", () => onChange(get()));
        window.removeEventListener("load", () => onChange(get()));
      };
    },
  };
};
