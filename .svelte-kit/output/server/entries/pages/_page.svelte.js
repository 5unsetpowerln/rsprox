import { b as set_current_component, r as run_all, d as current_component, c as create_ssr_component, f as compute_rest_props, h as spread, i as escape_attribute_value, j as escape_object, e as escape, k as add_classes, l as add_attribute, g as getContext, v as validate_component, n as createEventDispatcher, o as compute_slots, p as each, a as subscribe, s as setContext, q as set_store_value, t as add_styles, m as missing_component, u as onDestroy, w as hasContext, x as is_promise, y as noop } from "../../chunks/ssr.js";
import { r as readable, w as writable, d as derived } from "../../chunks/index.js";
import { BROWSER } from "esm-env-robust";
import { c as charset_options, h as history, g as get_small_history_header, a as get_small_history } from "../../chunks/proxy.js";
import { StateEffect, EditorState } from "@codemirror/state";
import { minimalSetup, basicSetup } from "codemirror";
import { barf } from "thememirror";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const ChevronRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M22 16L12 26 10.6 24.6 19.2 16 10.6 7.4 12 6z"></path></svg>`;
});
const InlineCheckbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["checked", "indeterminate", "title", "id", "ref"]);
  let { checked = false } = $$props;
  let { indeterminate = false } = $$props;
  let { title = void 0 } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  if ($$props.indeterminate === void 0 && $$bindings.indeterminate && indeterminate !== void 0) $$bindings.indeterminate(indeterminate);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  return `<div${add_classes("bx--checkbox--inline".trim())}><input${spread(
    [
      { type: "checkbox" },
      {
        checked: (indeterminate ? false : checked) || null
      },
      {
        indeterminate: escape_attribute_value(indeterminate)
      },
      { id: escape_attribute_value(id) },
      escape_object($$restProps),
      {
        "aria-checked": escape_attribute_value(indeterminate ? void 0 : checked)
      }
    ],
    { classes: "bx--checkbox" }
  )}${add_attribute("this", ref, 0)}> <label${add_attribute("for", id, 0)}${add_attribute("title", title, 0)}${add_attribute("aria-label", $$props["aria-label"], 0)}${add_classes("bx--checkbox-label".trim())}></label></div>`;
});
const Checkmark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M13 24L4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z"></path></svg>`;
});
const WarningFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25	c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z"></path><path fill="none" d="M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22	C16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z" data-icon-path="inner-path" opacity="0"></path></svg>`;
});
const WarningAltFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path fill="none" d="M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z" data-icon-path="inner-path"></path><path d="M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"></path><path d="M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"></path></svg>`;
});
const ListBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "size",
    "type",
    "open",
    "light",
    "disabled",
    "invalid",
    "invalidText",
    "warn",
    "warnText"
  ]);
  let { size = void 0 } = $$props;
  let { type = "default" } = $$props;
  let { open = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0) $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0) $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0) $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0) $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0) $$bindings.warnText(warnText);
  return `<div${spread(
    [
      { role: "listbox" },
      { tabindex: "-1" },
      {
        "data-invalid": escape_attribute_value(invalid || void 0)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--list-box " + (size === "sm" ? "bx--list-box--sm" : "") + " " + (size === "xl" ? "bx--list-box--xl" : "") + " " + (type === "inline" ? "bx--list-box--inline" : "") + " " + (disabled ? "bx--list-box--disabled" : "") + " " + (open ? "bx--list-box--expanded" : "") + " " + (light ? "bx--list-box--light" : "") + " " + (!invalid && warn ? "bx--list-box--warning" : "")
    }
  )}>${slots.default ? slots.default({}) : ``}</div> ${invalid ? `<div${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``} ${!invalid && warn ? `<div${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}`;
});
const ListBoxField = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaExpanded;
  let menuId;
  let $$restProps = compute_rest_props($$props, ["disabled", "role", "tabindex", "translationIds", "translateWithId", "id", "ref"]);
  let { disabled = false } = $$props;
  let { role = "combobox" } = $$props;
  let { tabindex = "-1" } = $$props;
  const translationIds = { close: "close", open: "open" };
  let { translateWithId = (id2) => defaultTranslations[id2] } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  const defaultTranslations = {
    [translationIds.close]: "Close menu",
    [translationIds.open]: "Open menu"
  };
  const ctx = getContext("MultiSelect");
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0) $$bindings.tabindex(tabindex);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0) $$bindings.translationIds(translationIds);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0) $$bindings.translateWithId(translateWithId);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  {
    if (ctx && ref) {
      ctx.declareRef({ key: "field", ref });
    }
  }
  ariaExpanded = $$props["aria-expanded"];
  menuId = `menu-${id}`;
  return ` <div${spread(
    [
      { role: escape_attribute_value(role) },
      {
        "aria-expanded": escape_attribute_value(ariaExpanded)
      },
      {
        "aria-owns": escape_attribute_value(ariaExpanded && menuId || void 0)
      },
      {
        "aria-controls": escape_attribute_value(ariaExpanded && menuId || void 0)
      },
      {
        "aria-disabled": escape_attribute_value(disabled)
      },
      {
        "aria-label": escape_attribute_value(ariaExpanded ? translateWithId("close") : translateWithId("open"))
      },
      {
        tabindex: escape_attribute_value(disabled ? "-1" : tabindex)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--list-box__field"
    }
  )}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const ListBoxMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["id", "ref"]);
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  return `<div${spread(
    [
      { role: "listbox" },
      { id: "menu-" + escape(id, true) },
      escape_object($$restProps)
    ],
    {
      classes: "bx--list-box__menu"
    }
  )}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const ChevronDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"></path></svg>`;
});
const ListBoxMenuIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let translationId;
  let description;
  let $$restProps = compute_rest_props($$props, ["open", "translationIds", "translateWithId"]);
  let { open = false } = $$props;
  const translationIds = { close: "close", open: "open" };
  let { translateWithId = (id) => defaultTranslations[id] } = $$props;
  const defaultTranslations = {
    [translationIds.close]: "Close menu",
    [translationIds.open]: "Open menu"
  };
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0) $$bindings.translationIds(translationIds);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0) $$bindings.translateWithId(translateWithId);
  translationId = open ? translationIds.close : translationIds.open;
  description = translateWithId?.(translationId) ?? defaultTranslations[translationId];
  return ` <div${spread([escape_object($$restProps)], {
    classes: "bx--list-box__menu-icon " + (open ? "bx--list-box__menu-icon--open" : "")
  })}>${validate_component(ChevronDown, "ChevronDown").$$render(
    $$result,
    {
      "aria-label": description,
      title: description
    },
    {},
    {}
  )}</div>`;
});
const ListBoxMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isTruncated;
  let title;
  let $$restProps = compute_rest_props($$props, ["active", "highlighted", "disabled"]);
  let { active = false } = $$props;
  let { highlighted = false } = $$props;
  let { disabled = false } = $$props;
  let ref = null;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0) $$bindings.active(active);
  if ($$props.highlighted === void 0 && $$bindings.highlighted && highlighted !== void 0) $$bindings.highlighted(highlighted);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  isTruncated = ref?.offsetWidth < ref?.scrollWidth;
  title = isTruncated ? ref?.innerText : void 0;
  {
    if (highlighted && ref && !ref.matches(":hover")) {
      ref.scrollIntoView({ block: "nearest" });
    }
  }
  return `<div${spread(
    [
      { role: "option" },
      { tabindex: "-1" },
      {
        "aria-selected": escape_attribute_value(active)
      },
      {
        disabled: (disabled ? true : void 0) || null
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--list-box__menu-item " + (active ? "bx--list-box__menu-item--active" : "") + " " + (highlighted || active ? "bx--list-box__menu-item--highlighted" : "")
    }
  )}><div${add_attribute("title", title, 0)}${add_classes("bx--list-box__menu-item__option".trim())}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path></svg>`;
});
const ListBoxSelection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let translationId;
  let description;
  let $$restProps = compute_rest_props($$props, ["selectionCount", "disabled", "translationIds", "translateWithId", "ref"]);
  let { selectionCount = void 0 } = $$props;
  let { disabled = false } = $$props;
  const translationIds = {
    clearAll: "clearAll",
    clearSelection: "clearSelection"
  };
  let { translateWithId = (id) => defaultTranslations[id] } = $$props;
  let { ref = null } = $$props;
  const defaultTranslations = {
    [translationIds.clearAll]: "Clear all selected items",
    [translationIds.clearSelection]: "Clear selected item"
  };
  createEventDispatcher();
  const ctx = getContext("MultiSelect");
  if ($$props.selectionCount === void 0 && $$bindings.selectionCount && selectionCount !== void 0) $$bindings.selectionCount(selectionCount);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0) $$bindings.translationIds(translationIds);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0) $$bindings.translateWithId(translateWithId);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  {
    if (ctx && ref) {
      ctx.declareRef({ key: "selection", ref });
    }
  }
  translationId = selectionCount ? translationIds.clearAll : translationIds.clearSelection;
  description = translateWithId?.(translationId) ?? defaultTranslations[translationId];
  return `${selectionCount !== void 0 ? `<div${add_classes(("bx--tag bx--tag--filter bx--tag--high-contrast " + (disabled ? "bx--tag--disabled" : "")).trim())}><span${add_attribute("title", selectionCount, 0)}${add_classes("bx--tag__label".trim())}>${escape(selectionCount)}</span> <div role="button"${add_attribute("tabindex", disabled ? -1 : 0, 0)} ${disabled ? "disabled" : ""}${add_attribute("aria-label", translationIds.clearAll, 0)}${add_attribute("title", description, 0)}${add_classes("bx--tag__close-icon".trim())}${add_attribute("this", ref, 0)}>${validate_component(Close, "Close").$$render($$result, {}, {}, {})}</div></div>` : `<div${spread(
    [
      { role: "button" },
      {
        "aria-label": escape_attribute_value(description)
      },
      {
        title: escape_attribute_value(description)
      },
      {
        tabindex: escape_attribute_value(disabled ? "-1" : "0")
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--list-box__selection " + (selectionCount ? "bx--tag--filter" : "") + " " + (selectionCount ? "bx--list-box__selection--multi" : "")
    }
  )}${add_attribute("this", ref, 0)}>${selectionCount !== void 0 ? `${escape(selectionCount)}` : ``} ${validate_component(Close, "Close").$$render($$result, {}, {}, {})}</div>`}`;
});
const ComboBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let menuId;
  let comboId;
  let highlightedId;
  let filteredItems;
  let $$restProps = compute_rest_props($$props, [
    "items",
    "itemToString",
    "selectedId",
    "value",
    "direction",
    "size",
    "disabled",
    "titleText",
    "placeholder",
    "helperText",
    "invalidText",
    "invalid",
    "warn",
    "warnText",
    "light",
    "open",
    "shouldFilterItem",
    "translateWithId",
    "translateWithIdSelection",
    "id",
    "name",
    "ref",
    "listRef",
    "clear"
  ]);
  let $$slots = compute_slots(slots);
  let { items = [] } = $$props;
  let { itemToString = (item) => item.text || item.id } = $$props;
  let { selectedId = void 0 } = $$props;
  let { value = "" } = $$props;
  let { direction = "bottom" } = $$props;
  let { size = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { titleText = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { helperText = "" } = $$props;
  let { invalidText = "" } = $$props;
  let { invalid = false } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { light = false } = $$props;
  let { open = false } = $$props;
  let { shouldFilterItem = () => true } = $$props;
  let { translateWithId = void 0 } = $$props;
  let { translateWithIdSelection = void 0 } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  let { listRef = null } = $$props;
  const dispatch = createEventDispatcher();
  let selectedItem = void 0;
  let prevSelectedId = null;
  let highlightedIndex = -1;
  function clear(options = {}) {
    prevSelectedId = null;
    highlightedIndex = -1;
    highlightedId = void 0;
    selectedId = void 0;
    selectedItem = void 0;
    open = false;
    value = "";
    if (options?.focus !== false) ref?.focus();
  }
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.itemToString === void 0 && $$bindings.itemToString && itemToString !== void 0) $$bindings.itemToString(itemToString);
  if ($$props.selectedId === void 0 && $$bindings.selectedId && selectedId !== void 0) $$bindings.selectedId(selectedId);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0) $$bindings.direction(direction);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.titleText === void 0 && $$bindings.titleText && titleText !== void 0) $$bindings.titleText(titleText);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0) $$bindings.helperText(helperText);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0) $$bindings.invalidText(invalidText);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0) $$bindings.invalid(invalid);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0) $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0) $$bindings.warnText(warnText);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0) $$bindings.light(light);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.shouldFilterItem === void 0 && $$bindings.shouldFilterItem && shouldFilterItem !== void 0) $$bindings.shouldFilterItem(shouldFilterItem);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0) $$bindings.translateWithId(translateWithId);
  if ($$props.translateWithIdSelection === void 0 && $$bindings.translateWithIdSelection && translateWithIdSelection !== void 0) $$bindings.translateWithIdSelection(translateWithIdSelection);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  if ($$props.listRef === void 0 && $$bindings.listRef && listRef !== void 0) $$bindings.listRef(listRef);
  if ($$props.clear === void 0 && $$bindings.clear && clear !== void 0) $$bindings.clear(clear);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    filteredItems = items.filter((item) => shouldFilterItem(item, value));
    {
      if (selectedId !== void 0) {
        if (prevSelectedId !== selectedId) {
          prevSelectedId = selectedId;
          if (filteredItems?.length === 1 && open) {
            selectedId = filteredItems[0].id;
            selectedItem = filteredItems[0];
            highlightedIndex = -1;
            highlightedId = void 0;
          } else {
            selectedItem = items.find((item) => item.id === selectedId);
          }
          dispatch("select", { selectedId, selectedItem });
        }
      } else {
        prevSelectedId = selectedId;
        selectedItem = void 0;
      }
    }
    ariaLabel = $$props["aria-label"] || "Choose an item";
    menuId = `menu-${id}`;
    comboId = `combo-${id}`;
    highlightedId = items[highlightedIndex] ? items[highlightedIndex].id : 0;
    $$rendered = ` <div${add_classes("bx--list-box__wrapper".trim())}>${titleText || $$slots.titleText ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (disabled ? "bx--label--disabled" : "")).trim())}>${slots.titleText ? slots.titleText({}) : ` ${escape(titleText)} `}</label>` : ``} ${validate_component(ListBox, "ListBox").$$render(
      $$result,
      {
        class: "bx--combo-box " + (direction === "top" && "bx--list-box--up") + " " + (!invalid && warn && "bx--combo-box--warning"),
        id: comboId,
        "aria-label": ariaLabel,
        disabled,
        invalid,
        invalidText,
        open,
        light,
        size,
        warn,
        warnText
      },
      {},
      {
        default: () => {
          return `${validate_component(ListBoxField, "ListBoxField").$$render(
            $$result,
            {
              role: "button",
              "aria-expanded": open,
              id,
              disabled,
              translateWithId
            },
            {},
            {
              default: () => {
                return `<input${spread(
                  [
                    { tabindex: "0" },
                    { autocomplete: "off" },
                    { "aria-autocomplete": "list" },
                    {
                      "aria-expanded": escape_attribute_value(open)
                    },
                    {
                      "aria-activedescendant": escape_attribute_value(highlightedId)
                    },
                    {
                      "aria-labelledby": escape_attribute_value(comboId)
                    },
                    {
                      "aria-disabled": escape_attribute_value(disabled)
                    },
                    {
                      "aria-controls": escape_attribute_value(open ? menuId : void 0)
                    },
                    {
                      "aria-owns": escape_attribute_value(open ? menuId : void 0)
                    },
                    { disabled: disabled || null },
                    {
                      placeholder: escape_attribute_value(placeholder)
                    },
                    { id: escape_attribute_value(id) },
                    { name: escape_attribute_value(name) },
                    escape_object($$restProps)
                  ],
                  {
                    classes: "bx--text-input " + (light ? "bx--text-input--light" : "") + " " + (value === "" ? "bx--text-input--empty" : "")
                  }
                )}${add_attribute("this", ref, 0)}${add_attribute("value", value, 0)}> ${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--list-box__invalid-icon" }, {}, {})}` : ``} ${!invalid && warn ? `${validate_component(WarningAltFilled, "WarningAltFilled").$$render(
                  $$result,
                  {
                    class: "bx--list-box__invalid-icon bx--list-box__invalid-icon--warning"
                  },
                  {},
                  {}
                )}` : ``} ${value ? `${validate_component(ListBoxSelection, "ListBoxSelection").$$render(
                  $$result,
                  {
                    translateWithId: translateWithIdSelection,
                    disabled,
                    open
                  },
                  {},
                  {}
                )}` : ``} ${validate_component(ListBoxMenuIcon, "ListBoxMenuIcon").$$render($$result, { translateWithId, open }, {}, {})}`;
              }
            }
          )} ${open ? `${validate_component(ListBoxMenu, "ListBoxMenu").$$render(
            $$result,
            {
              "aria-label": ariaLabel,
              id,
              ref: listRef
            },
            {
              ref: ($$value) => {
                listRef = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${each(filteredItems, (item, i) => {
                  return `${validate_component(ListBoxMenuItem, "ListBoxMenuItem").$$render(
                    $$result,
                    {
                      id: item.id,
                      active: selectedId === item.id,
                      highlighted: highlightedIndex === i,
                      disabled: item.disabled
                    },
                    {},
                    {
                      default: () => {
                        return `${slots.default ? slots.default({ item, index: i }) : ` ${escape(itemToString(item))} `} ${selectedItem && selectedItem.id === item.id ? `${validate_component(Checkmark, "Checkmark").$$render(
                          $$result,
                          {
                            class: "bx--list-box__menu-item__selected-icon"
                          },
                          {},
                          {}
                        )}` : ``} `;
                      }
                    }
                  )}`;
                })}`;
              }
            }
          )}` : ``}`;
        }
      }
    )} ${!invalid && helperText && !warn ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")).trim())}>${escape(helperText)}</div>` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const RadioButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "value",
    "checked",
    "disabled",
    "required",
    "labelPosition",
    "labelText",
    "hideLabel",
    "id",
    "name",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let $selectedValue, $$unsubscribe_selectedValue;
  let $groupName, $$unsubscribe_groupName;
  let $groupRequired, $$unsubscribe_groupRequired;
  let { value = "" } = $$props;
  let { checked = false } = $$props;
  let { disabled = false } = $$props;
  let { required = false } = $$props;
  let { labelPosition = "right" } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  const { add, update: update2, selectedValue, groupName, groupRequired } = getContext("RadioButtonGroup") ?? {
    groupName: readable(void 0),
    groupRequired: readable(void 0),
    selectedValue: readable(checked ? value : void 0)
  };
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value2) => $selectedValue = value2);
  $$unsubscribe_groupName = subscribe(groupName, (value2) => $groupName = value2);
  $$unsubscribe_groupRequired = subscribe(groupRequired, (value2) => $groupRequired = value2);
  if (add) {
    add({ id, checked, disabled, value });
  }
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.labelPosition === void 0 && $$bindings.labelPosition && labelPosition !== void 0) $$bindings.labelPosition(labelPosition);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0) $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0) $$bindings.hideLabel(hideLabel);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  checked = $selectedValue === value;
  $$unsubscribe_selectedValue();
  $$unsubscribe_groupName();
  $$unsubscribe_groupRequired();
  return `<div${spread([escape_object($$restProps)], {
    classes: "bx--radio-button-wrapper " + (labelPosition === "left" ? "bx--radio-button-wrapper--label-left" : "")
  })}><input type="radio"${add_attribute("id", id, 0)}${add_attribute("name", $groupName ?? name, 0)} ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} ${$groupRequired ?? required ? "required" : ""}${add_attribute("value", value, 0)}${add_classes("bx--radio-button".trim())}${add_attribute("this", ref, 0)}> <label${add_attribute("for", id, 0)}${add_classes("bx--radio-button__label".trim())}><span${add_classes("bx--radio-button__appearance".trim())}></span> ${labelText || $$slots.labelText ? `<span${add_classes((hideLabel ? "bx--visually-hidden" : "").trim())}>${slots.labelText ? slots.labelText({}) : ` ${escape(labelText)} `}</span>` : ``}</label></div>`;
});
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "zebra", "useStaticWidth", "sortable", "stickyHeader", "tableStyle"]);
  let { size = void 0 } = $$props;
  let { zebra = false } = $$props;
  let { useStaticWidth = false } = $$props;
  let { sortable = false } = $$props;
  let { stickyHeader = false } = $$props;
  let { tableStyle = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.zebra === void 0 && $$bindings.zebra && zebra !== void 0) $$bindings.zebra(zebra);
  if ($$props.useStaticWidth === void 0 && $$bindings.useStaticWidth && useStaticWidth !== void 0) $$bindings.useStaticWidth(useStaticWidth);
  if ($$props.sortable === void 0 && $$bindings.sortable && sortable !== void 0) $$bindings.sortable(sortable);
  if ($$props.stickyHeader === void 0 && $$bindings.stickyHeader && stickyHeader !== void 0) $$bindings.stickyHeader(stickyHeader);
  if ($$props.tableStyle === void 0 && $$bindings.tableStyle && tableStyle !== void 0) $$bindings.tableStyle(tableStyle);
  return `${stickyHeader ? `<section${spread([escape_object($$restProps)], {
    classes: "bx--data-table_inner-container"
  })}><table${add_attribute("style", tableStyle, 0)}${add_classes(("bx--data-table " + (size === "compact" ? "bx--data-table--compact" : "") + " " + (size === "short" ? "bx--data-table--short" : "") + " " + (size === "tall" ? "bx--data-table--tall" : "") + " " + (size === "medium" ? "bx--data-table--md" : "") + " " + (sortable ? "bx--data-table--sort" : "") + " " + (zebra ? "bx--data-table--zebra" : "") + " " + (useStaticWidth ? "bx--data-table--static" : "") + " " + (stickyHeader ? "bx--data-table--sticky-header" : "")).trim())}>${slots.default ? slots.default({}) : ``}</table></section>` : `<table${spread(
    [
      escape_object($$restProps),
      {
        style: escape_attribute_value(tableStyle)
      }
    ],
    {
      classes: "bx--data-table " + (size === "compact" ? "bx--data-table--compact" : "") + " " + (size === "short" ? "bx--data-table--short" : "") + " " + (size === "tall" ? "bx--data-table--tall" : "") + " " + (size === "medium" ? "bx--data-table--md" : "") + " " + (sortable ? "bx--data-table--sort" : "") + " " + (zebra ? "bx--data-table--zebra" : "") + " " + (useStaticWidth ? "bx--data-table--static" : "") + " " + (stickyHeader ? "bx--data-table--sticky-header" : "")
    }
  )}>${slots.default ? slots.default({}) : ``}</table>`}`;
});
const TableBody = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<tbody${spread([{ "aria-live": "polite" }, escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</tbody>`;
});
const TableCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return ` <td${spread([escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</td>`;
});
const TableContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title", "description", "stickyHeader", "useStaticWidth"]);
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { stickyHeader = false } = $$props;
  let { useStaticWidth = false } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.stickyHeader === void 0 && $$bindings.stickyHeader && stickyHeader !== void 0) $$bindings.stickyHeader(stickyHeader);
  if ($$props.useStaticWidth === void 0 && $$bindings.useStaticWidth && useStaticWidth !== void 0) $$bindings.useStaticWidth(useStaticWidth);
  return `<div${spread([escape_object($$restProps)], {
    classes: "bx--data-table-container " + (useStaticWidth ? "bx--data-table-container--static" : "") + " " + (stickyHeader ? "bx--data-table--max-width" : "")
  })}>${title ? `<div${add_classes("bx--data-table-header".trim())}><h4${add_classes("bx--data-table-header__title".trim())}>${escape(title)}</h4> <p${add_classes("bx--data-table-header__description".trim())}>${escape(description)}</p></div>` : ``} ${slots.default ? slots.default({}) : ``}</div>`;
});
const TableHead = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `  <thead${spread([escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</thead>`;
});
const ArrowUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M16 4L6 14 7.41 15.41 15 7.83 15 28 17 28 17 7.83 24.59 15.41 26 14 16 4z"></path></svg>`;
});
const ArrowsVertical = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M27.6 20.6L24 24.2 24 4 22 4 22 24.2 18.4 20.6 17 22 23 28 29 22zM9 4L3 10 4.4 11.4 8 7.8 8 28 10 28 10 7.8 13.6 11.4 15 10z"></path></svg>`;
});
const TableHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, ["sortable", "sortDirection", "active", "scope", "translateWithId", "id"]);
  let { sortable = false } = $$props;
  let { sortDirection = "none" } = $$props;
  let { active = false } = $$props;
  let { scope = "col" } = $$props;
  let { translateWithId = () => "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  if ($$props.sortable === void 0 && $$bindings.sortable && sortable !== void 0) $$bindings.sortable(sortable);
  if ($$props.sortDirection === void 0 && $$bindings.sortDirection && sortDirection !== void 0) $$bindings.sortDirection(sortDirection);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0) $$bindings.active(active);
  if ($$props.scope === void 0 && $$bindings.scope && scope !== void 0) $$bindings.scope(scope);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0) $$bindings.translateWithId(translateWithId);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  ariaLabel = translateWithId();
  return ` ${sortable ? `<th${spread(
    [
      {
        "aria-sort": escape_attribute_value(active ? sortDirection : "none")
      },
      { scope: escape_attribute_value(scope) },
      {
        "data-header": escape_attribute_value(id)
      },
      escape_object($$restProps)
    ],
    {}
  )}><button type="button"${add_classes(("bx--table-sort " + (active ? "bx--table-sort--active" : "") + " " + (active && sortDirection === "descending" ? "bx--table-sort--ascending" : "")).trim())}><div${add_classes("bx--table-header-label".trim())}>${slots.default ? slots.default({}) : ``}</div> ${validate_component(ArrowUp, "ArrowUp").$$render(
    $$result,
    {
      size: 20,
      "aria-label": ariaLabel,
      class: "bx--table-sort__icon"
    },
    {},
    {}
  )} ${validate_component(ArrowsVertical, "ArrowsVertical").$$render(
    $$result,
    {
      size: 20,
      "aria-label": ariaLabel,
      class: "bx--table-sort__icon-unsorted"
    },
    {},
    {}
  )}</button></th>` : `<th${spread(
    [
      { scope: escape_attribute_value(scope) },
      {
        "data-header": escape_attribute_value(id)
      },
      escape_object($$restProps)
    ],
    {}
  )}><div${add_classes("bx--table-header-label".trim())}>${slots.default ? slots.default({}) : ``}</div></th>`}`;
});
const TableRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return ` <tr${spread([escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</tr>`;
});
const DataTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let expandedRows;
  let rowIds;
  let expandableRowIds;
  let selectableRowIds;
  let selectAll;
  let indeterminate;
  let headerKeys;
  let tableCellsByRowId;
  let sortedRows;
  let ascending;
  let sorting;
  let sortingHeader;
  let displayedRows;
  let displayedSortedRows;
  let hasCustomHeaderWidth;
  let $$restProps = compute_rest_props($$props, [
    "headers",
    "rows",
    "size",
    "title",
    "description",
    "zebra",
    "sortable",
    "sortKey",
    "sortDirection",
    "expandable",
    "batchExpansion",
    "expandedRowIds",
    "nonExpandableRowIds",
    "radio",
    "selectable",
    "batchSelection",
    "selectedRowIds",
    "nonSelectableRowIds",
    "stickyHeader",
    "useStaticWidth",
    "pageSize",
    "page"
  ]);
  let $$slots = compute_slots(slots);
  let $tableRows, $$unsubscribe_tableRows;
  let { headers = [] } = $$props;
  let { rows = [] } = $$props;
  let { size = void 0 } = $$props;
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { zebra = false } = $$props;
  let { sortable = false } = $$props;
  let { sortKey = null } = $$props;
  let { sortDirection = "none" } = $$props;
  let { expandable = false } = $$props;
  let { batchExpansion = false } = $$props;
  let { expandedRowIds = [] } = $$props;
  let { nonExpandableRowIds = [] } = $$props;
  let { radio = false } = $$props;
  let { selectable = false } = $$props;
  let { batchSelection = false } = $$props;
  let { selectedRowIds = [] } = $$props;
  let { nonSelectableRowIds = [] } = $$props;
  let { stickyHeader = false } = $$props;
  let { useStaticWidth = false } = $$props;
  let { pageSize = 0 } = $$props;
  let { page = 0 } = $$props;
  createEventDispatcher();
  const batchSelectedIds = writable(false);
  const tableRows = writable(rows);
  $$unsubscribe_tableRows = subscribe(tableRows, (value) => $tableRows = value);
  const resolvePath = (object, path) => {
    if (path in object) return object[path];
    return path.split(/[\.\[\]\'\"]/).filter((p) => p).reduce((o, p) => o && typeof o === "object" ? o[p] : o, object);
  };
  setContext("DataTable", {
    batchSelectedIds,
    tableRows,
    resetSelectedRowIds: () => {
      selectAll = false;
      selectedRowIds = [];
      if (refSelectAll) refSelectAll.checked = false;
    }
  });
  let expanded = false;
  let parentRowId = null;
  let refSelectAll = null;
  const getDisplayedRows = (rows2, page2, pageSize2) => page2 && pageSize2 ? rows2.slice((page2 - 1) * pageSize2, page2 * pageSize2) : rows2;
  const formatHeaderWidth = (header) => {
    const styles = [
      header.width && `width: ${header.width}`,
      header.minWidth && `min-width: ${header.minWidth}`
    ].filter(Boolean);
    if (styles.length === 0) return void 0;
    return styles.join(";");
  };
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0) $$bindings.headers(headers);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0) $$bindings.rows(rows);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.zebra === void 0 && $$bindings.zebra && zebra !== void 0) $$bindings.zebra(zebra);
  if ($$props.sortable === void 0 && $$bindings.sortable && sortable !== void 0) $$bindings.sortable(sortable);
  if ($$props.sortKey === void 0 && $$bindings.sortKey && sortKey !== void 0) $$bindings.sortKey(sortKey);
  if ($$props.sortDirection === void 0 && $$bindings.sortDirection && sortDirection !== void 0) $$bindings.sortDirection(sortDirection);
  if ($$props.expandable === void 0 && $$bindings.expandable && expandable !== void 0) $$bindings.expandable(expandable);
  if ($$props.batchExpansion === void 0 && $$bindings.batchExpansion && batchExpansion !== void 0) $$bindings.batchExpansion(batchExpansion);
  if ($$props.expandedRowIds === void 0 && $$bindings.expandedRowIds && expandedRowIds !== void 0) $$bindings.expandedRowIds(expandedRowIds);
  if ($$props.nonExpandableRowIds === void 0 && $$bindings.nonExpandableRowIds && nonExpandableRowIds !== void 0) $$bindings.nonExpandableRowIds(nonExpandableRowIds);
  if ($$props.radio === void 0 && $$bindings.radio && radio !== void 0) $$bindings.radio(radio);
  if ($$props.selectable === void 0 && $$bindings.selectable && selectable !== void 0) $$bindings.selectable(selectable);
  if ($$props.batchSelection === void 0 && $$bindings.batchSelection && batchSelection !== void 0) $$bindings.batchSelection(batchSelection);
  if ($$props.selectedRowIds === void 0 && $$bindings.selectedRowIds && selectedRowIds !== void 0) $$bindings.selectedRowIds(selectedRowIds);
  if ($$props.nonSelectableRowIds === void 0 && $$bindings.nonSelectableRowIds && nonSelectableRowIds !== void 0) $$bindings.nonSelectableRowIds(nonSelectableRowIds);
  if ($$props.stickyHeader === void 0 && $$bindings.stickyHeader && stickyHeader !== void 0) $$bindings.stickyHeader(stickyHeader);
  if ($$props.useStaticWidth === void 0 && $$bindings.useStaticWidth && useStaticWidth !== void 0) $$bindings.useStaticWidth(useStaticWidth);
  if ($$props.pageSize === void 0 && $$bindings.pageSize && pageSize !== void 0) $$bindings.pageSize(pageSize);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    headers.reduce((a, c) => ({ ...a, [c.key]: c.key }), {});
    expandedRows = expandedRowIds.reduce((a, id) => ({ ...a, [id]: true }), {});
    {
      batchSelectedIds.set(selectedRowIds);
    }
    headerKeys = headers.map(({ key }) => key);
    tableCellsByRowId = rows.reduce(
      (rows2, row) => {
        rows2[row.id] = headerKeys.map((key, index) => ({
          key,
          value: resolvePath(row, key),
          display: headers[index].display
        }));
        return rows2;
      },
      {}
    );
    set_store_value(tableRows, $tableRows = rows, $tableRows);
    rowIds = $tableRows.map((row) => row.id);
    expandableRowIds = rowIds.filter((id) => !nonExpandableRowIds.includes(id));
    selectableRowIds = rowIds.filter((id) => !nonSelectableRowIds.includes(id));
    selectAll = selectableRowIds.length > 0 && selectedRowIds.length === selectableRowIds.length;
    indeterminate = selectedRowIds.length > 0 && selectedRowIds.length < selectableRowIds.length;
    {
      if (batchExpansion) {
        expandable = true;
        expanded = expandedRowIds.length === expandableRowIds.length;
      }
    }
    {
      if (radio || batchSelection) selectable = true;
    }
    sortedRows = [...$tableRows];
    ascending = sortDirection === "ascending";
    sorting = sortable && sortKey != null;
    sortingHeader = headers.find((header) => header.key === sortKey);
    {
      if (sorting) {
        if (sortDirection === "none") {
          sortedRows = $tableRows;
        } else {
          sortedRows = [...$tableRows].sort((a, b) => {
            const itemA = ascending ? resolvePath(a, sortKey) : resolvePath(b, sortKey);
            const itemB = ascending ? resolvePath(b, sortKey) : resolvePath(a, sortKey);
            if (sortingHeader?.sort) return sortingHeader.sort(itemA, itemB);
            if (typeof itemA === "number" && typeof itemB === "number") return itemA - itemB;
            if ([itemA, itemB].every((item) => !item && item !== 0)) return 0;
            if (!itemA && itemA !== 0) return ascending ? 1 : -1;
            if (!itemB && itemB !== 0) return ascending ? -1 : 1;
            return itemA.toString().localeCompare(itemB.toString(), "en", { numeric: true });
          });
        }
      }
    }
    displayedRows = getDisplayedRows($tableRows, page, pageSize);
    displayedSortedRows = getDisplayedRows(sortedRows, page, pageSize);
    hasCustomHeaderWidth = headers.some((header) => header.width || header.minWidth);
    $$rendered = `${validate_component(TableContainer, "TableContainer").$$render($$result, Object.assign({}, { useStaticWidth }, $$restProps), {}, {
      default: () => {
        return `${title || $$slots.title || description || $$slots.description ? `<div${add_classes("bx--data-table-header".trim())}>${title || $$slots.title ? `<h4${add_classes("bx--data-table-header__title".trim())}>${slots.title ? slots.title({}) : `${escape(title)}`}</h4>` : ``} ${description || $$slots.description ? `<p${add_classes("bx--data-table-header__description".trim())}>${slots.description ? slots.description({}) : `${escape(description)}`}</p>` : ``}</div>` : ``} ${slots.default ? slots.default({}) : ``} ${validate_component(Table, "Table").$$render(
          $$result,
          {
            zebra,
            size,
            stickyHeader,
            sortable,
            useStaticWidth,
            tableStyle: hasCustomHeaderWidth && "table-layout: fixed"
          },
          {},
          {
            default: () => {
              return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableRow, "TableRow").$$render($$result, {}, {}, {
                    default: () => {
                      return `${expandable ? `<th scope="col"${add_attribute("data-previous-value", expanded ? "collapsed" : void 0, 0)}${add_classes("bx--table-expand".trim())}>${batchExpansion ? `<button type="button"${add_classes("bx--table-expand__button".trim())}>${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "bx--table-expand__svg" }, {}, {})}</button>` : ``}</th>` : ``} ${selectable && !batchSelection ? `<th scope="col"></th>` : ``} ${batchSelection && !radio ? `<th scope="col"${add_classes("bx--table-column-checkbox".trim())}>${validate_component(InlineCheckbox, "InlineCheckbox").$$render(
                        $$result,
                        {
                          "aria-label": "Select all rows",
                          checked: selectAll,
                          indeterminate,
                          ref: refSelectAll
                        },
                        {
                          ref: ($$value) => {
                            refSelectAll = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}</th>` : ``} ${each(headers, (header) => {
                        return `${header.empty ? `<th scope="col"${add_attribute("style", formatHeaderWidth(header), 0)}></th>` : `${validate_component(TableHeader, "TableHeader").$$render(
                          $$result,
                          {
                            id: header.key,
                            style: formatHeaderWidth(header),
                            sortable: sortable && header.sort !== false,
                            sortDirection: sortKey === header.key ? sortDirection : "none",
                            active: sortKey === header.key
                          },
                          {},
                          {
                            default: () => {
                              return `${slots["cell-header"] ? slots["cell-header"]({ header }) : `${escape(header.value)}`} `;
                            }
                          }
                        )}`}`;
                      })}`;
                    }
                  })}`;
                }
              })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                default: () => {
                  return `${each(sorting ? displayedSortedRows : displayedRows, (row, i) => {
                    return `${validate_component(TableRow, "TableRow").$$render(
                      $$result,
                      {
                        "data-row": row.id,
                        "data-parent-row": expandable ? true : void 0,
                        class: (selectedRowIds.includes(row.id) ? "bx--data-table--selected" : "") + " " + (expandedRows[row.id] ? "bx--expandable-row" : "") + " " + (expandable ? "bx--parent-row" : "") + " " + (expandable && parentRowId === row.id ? "bx--expandable-row--hover" : "")
                      },
                      {},
                      {
                        default: () => {
                          return `${expandable ? `${validate_component(TableCell, "TableCell").$$render(
                            $$result,
                            {
                              class: "bx--table-expand",
                              headers: "expand",
                              "data-previous-value": !nonExpandableRowIds.includes(row.id) && expandedRows[row.id] ? "collapsed" : void 0
                            },
                            {},
                            {
                              default: () => {
                                return `${!nonExpandableRowIds.includes(row.id) ? `<button type="button"${add_attribute(
                                  "aria-label",
                                  expandedRows[row.id] ? "Collapse current row" : "Expand current row",
                                  0
                                )}${add_classes("bx--table-expand__button".trim())}>${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "bx--table-expand__svg" }, {}, {})} </button>` : ``} `;
                              }
                            }
                          )}` : ``} ${selectable ? `<td${add_classes(("bx--table-column-checkbox " + (radio ? "bx--table-column-radio" : "")).trim())}>${!nonSelectableRowIds.includes(row.id) ? `${radio ? `${validate_component(RadioButton, "RadioButton").$$render(
                            $$result,
                            {
                              name: "select-row-" + row.id,
                              checked: selectedRowIds.includes(row.id)
                            },
                            {},
                            {}
                          )}` : `${validate_component(InlineCheckbox, "InlineCheckbox").$$render(
                            $$result,
                            {
                              name: "select-row-" + row.id,
                              checked: selectedRowIds.includes(row.id)
                            },
                            {},
                            {}
                          )}`}` : ``} </td>` : ``} ${each(tableCellsByRowId[row.id], (cell, j) => {
                            return `${headers[j].empty ? `<td${add_classes((headers[j].columnMenu ? "bx--table-column-menu" : "").trim())}>${slots.cell ? slots.cell({ row, cell, rowIndex: i, cellIndex: j }) : ` ${escape(cell.display ? cell.display(cell.value, row) : cell.value)} `} </td>` : `${validate_component(TableCell, "TableCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${slots.cell ? slots.cell({ row, cell, rowIndex: i, cellIndex: j }) : ` ${escape(cell.display ? cell.display(cell.value, row) : cell.value)} `} `;
                              }
                            })}`}`;
                          })} `;
                        }
                      }
                    )} ${expandable ? `<tr data-child-row${add_classes("bx--expandable-row".trim())}>${expandedRows[row.id] && !nonExpandableRowIds.includes(row.id) ? `${validate_component(TableCell, "TableCell").$$render(
                      $$result,
                      {
                        colspan: selectable ? headers.length + 2 : headers.length + 1
                      },
                      {},
                      {
                        default: () => {
                          return `<div${add_classes("bx--child-row-inner-container".trim())}>${slots["expanded-row"] ? slots["expanded-row"]({ row }) : ``}</div> `;
                        }
                      }
                    )}` : ``} </tr>` : ``}`;
                  })}`;
                }
              })}`;
            }
          }
        )}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_tableRows();
  return $$rendered;
});
const EditOff = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M30 28.6L3.4 2 2 3.4l10.1 10.1L4 21.6V28h6.4l8.1-8.1L28.6 30 30 28.6zM9.6 26H6v-3.6l7.5-7.5 3.6 3.6L9.6 26zM29.4 6.2L29.4 6.2l-3.6-3.6c-.8-.8-2-.8-2.8 0l0 0 0 0-8 8 1.4 1.4L20 8.4l3.6 3.6L20 15.6l1.4 1.4 8-8C30.2 8.2 30.2 7 29.4 6.2L29.4 6.2zM25 10.6L21.4 7l3-3L28 7.6 25 10.6z"></path></svg>`;
});
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentTab;
  let currentContent;
  let $$restProps = compute_rest_props($$props, ["selected", "type", "autoWidth", "iconDescription", "triggerHref"]);
  let $selectedTab, $$unsubscribe_selectedTab;
  let $content, $$unsubscribe_content;
  let $tabs, $$unsubscribe_tabs;
  let $tabsById, $$unsubscribe_tabsById;
  let { selected = 0 } = $$props;
  let { type = "default" } = $$props;
  let { autoWidth = false } = $$props;
  let { iconDescription = "Show menu options" } = $$props;
  let { triggerHref = "#" } = $$props;
  createEventDispatcher();
  const tabs = writable([]);
  $$unsubscribe_tabs = subscribe(tabs, (value) => $tabs = value);
  const tabsById = derived(tabs, (_) => _.reduce((a, c) => ({ ...a, [c.id]: c }), {}));
  $$unsubscribe_tabsById = subscribe(tabsById, (value) => $tabsById = value);
  const useAutoWidth = writable(autoWidth);
  const selectedTab = writable(void 0);
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  const content = writable([]);
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  const contentById = derived(content, (_) => _.reduce((a, c) => ({ ...a, [c.id]: c }), {}));
  const selectedContent = writable(void 0);
  let refTabList = null;
  setContext("Tabs", {
    tabs,
    contentById,
    selectedTab,
    selectedContent,
    useAutoWidth,
    add: (data) => {
      tabs.update((_) => [..._, { ...data, index: _.length }]);
    },
    addContent: (data) => {
      content.update((_) => [..._, { ...data, index: _.length }]);
    },
    update: (id) => {
      currentIndex = $tabsById[id].index;
    },
    change: async (direction) => {
      let index = currentIndex + direction;
      if (index < 0) {
        index = $tabs.length - 1;
      } else if (index >= $tabs.length) {
        index = 0;
      }
      let disabled = $tabs[index].disabled;
      while (disabled) {
        index = index + direction;
        if (index < 0) {
          index = $tabs.length - 1;
        } else if (index >= $tabs.length) {
          index = 0;
        }
        disabled = $tabs[index].disabled;
      }
      currentIndex = index;
      await tick();
    }
  });
  let dropdownHidden = true;
  let currentIndex = selected;
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.autoWidth === void 0 && $$bindings.autoWidth && autoWidth !== void 0) $$bindings.autoWidth(autoWidth);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0) $$bindings.iconDescription(iconDescription);
  if ($$props.triggerHref === void 0 && $$bindings.triggerHref && triggerHref !== void 0) $$bindings.triggerHref(triggerHref);
  currentIndex = selected;
  currentTab = $tabs[currentIndex] || void 0;
  currentContent = $content[currentIndex] || void 0;
  {
    {
      if (currentTab) {
        selectedTab.set(currentTab.id);
      }
      if (currentContent) {
        selectedContent.set(currentContent.id);
      }
    }
  }
  {
    if ($selectedTab) {
      dropdownHidden = true;
    }
  }
  {
    useAutoWidth.set(autoWidth);
  }
  $$unsubscribe_selectedTab();
  $$unsubscribe_content();
  $$unsubscribe_tabs();
  $$unsubscribe_tabsById();
  return `<div${spread([{ role: "navigation" }, escape_object($$restProps)], {
    classes: "bx--tabs " + (type === "container" ? "bx--tabs--container" : "")
  })}><div role="listbox" tabindex="0"${add_attribute("aria-label", $$props["aria-label"] || "listbox", 0)}${add_classes("bx--tabs-trigger".trim())}><a tabindex="-1"${add_attribute("href", triggerHref, 0)}${add_classes("bx--tabs-trigger-text".trim())}>${currentTab ? `${escape(currentTab.label)}` : ``}</a> ${validate_component(ChevronDown, "ChevronDown").$$render(
    $$result,
    {
      "aria-hidden": "true",
      title: iconDescription
    },
    {},
    {}
  )}</div>  <ul role="tablist"${add_classes(("bx--tabs__nav " + (dropdownHidden ? "bx--tabs__nav--hidden" : "")).trim())}${add_attribute("this", refTabList, 0)}>${slots.default ? slots.default({}) : ``}</ul></div> ${slots.content ? slots.content({}) : ``}`;
});
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let $$restProps = compute_rest_props($$props, ["label", "href", "disabled", "tabindex", "id", "ref"]);
  let $selectedTab, $$unsubscribe_selectedTab;
  let $useAutoWidth, $$unsubscribe_useAutoWidth;
  let { label = "" } = $$props;
  let { href = "#" } = $$props;
  let { disabled = false } = $$props;
  let { tabindex = "0" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  const { selectedTab, useAutoWidth, add, update: update2, change } = getContext("Tabs");
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  $$unsubscribe_useAutoWidth = subscribe(useAutoWidth, (value) => $useAutoWidth = value);
  add({ id, label, disabled });
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0) $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  selected = $selectedTab === id;
  $$unsubscribe_selectedTab();
  $$unsubscribe_useAutoWidth();
  return ` <li${spread([{ tabindex: "-1" }, { role: "presentation" }, escape_object($$restProps)], {
    classes: "bx--tabs__nav-item " + (disabled ? "bx--tabs__nav-item--disabled" : "") + " " + (selected ? "bx--tabs__nav-item--selected" : "")
  })}><a role="tab"${add_attribute("tabindex", disabled ? "-1" : tabindex, 0)}${add_attribute("aria-selected", selected, 0)}${add_attribute("aria-disabled", disabled, 0)}${add_attribute("id", id, 0)}${add_attribute("href", href, 0)}${add_classes("bx--tabs__nav-link".trim())}${add_styles({
    "width": $useAutoWidth ? "auto" : void 0
  })}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : `${escape(label)}`}</a></li>`;
});
const TabContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let index;
  let tabId;
  let $$restProps = compute_rest_props($$props, ["id"]);
  let $tabs, $$unsubscribe_tabs;
  let $contentById, $$unsubscribe_contentById;
  let $selectedContent, $$unsubscribe_selectedContent;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  const { selectedContent, addContent, tabs, contentById } = getContext("Tabs");
  $$unsubscribe_selectedContent = subscribe(selectedContent, (value) => $selectedContent = value);
  $$unsubscribe_tabs = subscribe(tabs, (value) => $tabs = value);
  $$unsubscribe_contentById = subscribe(contentById, (value) => $contentById = value);
  addContent({ id });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  selected = $selectedContent === id;
  index = $contentById[id].index;
  tabId = $tabs[index].id;
  $$unsubscribe_tabs();
  $$unsubscribe_contentById();
  $$unsubscribe_selectedContent();
  return `<div${spread(
    [
      { role: "tabpanel" },
      {
        "aria-labelledby": escape_attribute_value(tabId)
      },
      {
        "aria-hidden": escape_attribute_value(!selected)
      },
      {
        hidden: (selected ? void 0 : "") || null
      },
      { id: escape_attribute_value(id) },
      escape_object($$restProps)
    ],
    { classes: "bx--tab-content" }
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const TextInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFluid;
  let error;
  let helperId;
  let errorId;
  let warnId;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "placeholder",
    "light",
    "disabled",
    "helperText",
    "id",
    "name",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "ref",
    "required",
    "inline",
    "readonly"
  ]);
  let $$slots = compute_slots(slots);
  let { size = void 0 } = $$props;
  let { value = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { helperText = "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { ref = null } = $$props;
  let { required = false } = $$props;
  let { inline = false } = $$props;
  let { readonly = false } = $$props;
  const ctx = getContext("Form");
  createEventDispatcher();
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0) $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0) $$bindings.helperText(helperText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0) $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0) $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0) $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0) $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0) $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0) $$bindings.warnText(warnText);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  isFluid = !!ctx && ctx.isFluid;
  error = invalid && !readonly;
  helperId = `helper-${id}`;
  errorId = `error-${id}`;
  warnId = `warn-${id}`;
  return `   <div${add_classes(("bx--form-item bx--text-input-wrapper " + (inline ? "bx--text-input-wrapper--inline" : "") + " " + (light ? "bx--text-input-wrapper--light" : "") + " " + (readonly ? "bx--text-input-wrapper--readonly" : "")).trim())}>${inline ? `<div${add_classes("bx--text-input__label-helper-wrapper".trim())}>${labelText ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "") + " " + (size === "sm" ? "bx--label--inline--sm" : "") + " " + (size === "xl" ? "bx--label--inline--xl" : "")).trim())}>${slots.labelText ? slots.labelText({}) : ` ${escape(labelText)} `}</label>` : ``} ${!isFluid && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")).trim())}>${escape(helperText)}</div>` : ``}</div>` : ``} ${!inline && (labelText || $$slots.labelText) ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "") + " " + (inline && size === "sm" ? "bx--label--inline-sm" : "") + " " + (inline && size === "xl" ? "bx--label--inline-xl" : "")).trim())}>${slots.labelText ? slots.labelText({}) : ` ${escape(labelText)} `}</label>` : ``} <div${add_classes(("bx--text-input__field-outer-wrapper " + (inline ? "bx--text-input__field-outer-wrapper--inline" : "")).trim())}><div${add_attribute("data-invalid", error || void 0, 0)}${add_attribute("data-warn", warn || void 0, 0)}${add_classes(("bx--text-input__field-wrapper " + (!invalid && warn ? "bx--text-input__field-wrapper--warning" : "")).trim())}>${readonly ? `${validate_component(EditOff, "EditOff").$$render($$result, { class: "bx--text-input__readonly-icon" }, {}, {})}` : `${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--text-input__invalid-icon" }, {}, {})}` : ``} ${!invalid && warn ? `${validate_component(WarningAltFilled, "WarningAltFilled").$$render(
    $$result,
    {
      class: "bx--text-input__invalid-icon\n            bx--text-input__invalid-icon--warning"
    },
    {},
    {}
  )}` : ``}`} <input${spread(
    [
      {
        "data-invalid": escape_attribute_value(error || void 0)
      },
      {
        "aria-invalid": escape_attribute_value(error || void 0)
      },
      {
        "data-warn": escape_attribute_value(warn || void 0)
      },
      {
        "aria-describedby": escape_attribute_value(error ? errorId : warn ? warnId : helperText ? helperId : void 0)
      },
      { disabled: disabled || null },
      { id: escape_attribute_value(id) },
      { name: escape_attribute_value(name) },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { required: required || null },
      { readonly: readonly || null },
      escape_object($$restProps)
    ],
    {
      classes: "bx--text-input " + (light ? "bx--text-input--light" : "") + " " + (error ? "bx--text-input--invalid" : "") + " " + (warn ? "bx--text-input--warning" : "") + " " + (size === "sm" ? "bx--text-input--sm" : "") + " " + (size === "xl" ? "bx--text-input--xl" : "")
    }
  )}${add_attribute("this", ref, 0)}${add_attribute("value", value, 0)}> ${isFluid ? `<hr${add_classes("bx--text-input__divider".trim())}>` : ``} ${isFluid && !inline && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``} ${isFluid && !inline && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}</div> ${!invalid && !warn && !isFluid && !inline && helperText ? `<div${add_attribute("id", helperId, 0)}${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")).trim())}>${escape(helperText)}</div>` : ``} ${!isFluid && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``} ${!isFluid && !invalid && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}</div></div>`;
});
function get_component_name(component) {
  return component.name.split("<")[1].split(">")[0];
}
const Tabs_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { components = [] } = $$props;
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  return ` ${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {
    content: () => {
      return `${each(components, (component) => {
        return `${validate_component(TabContent, "TabContent").$$render($$result, { style: "padding: 0px;" }, {}, {
          default: () => {
            return `${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`;
          }
        })}`;
      })} `;
    },
    default: () => {
      return `${each(components, (component) => {
        return `${validate_component(Tab, "Tab").$$render($$result, { label: get_component_name(component) }, {}, {})}`;
      })}`;
    }
  })}`;
});
const gatheringKey = {};
const GatheringRound = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  setContext(gatheringKey, true);
  return `${slots.default ? slots.default({}) : ``}`;
});
function pxToNumber(pxString) {
  if (!pxString?.endsWith("px")) {
    return void 0;
  }
  const num = parseFloat(pxString.slice(0, pxString.length - 2));
  return isNaN(num) ? void 0 : num;
}
const getDimensionName = (horizontal) => horizontal ? "height" : "width";
const calcComputedStyle = (element) => /* @__PURE__ */ window.getComputedStyle(element);
const getElementRect = (element) => /* @__PURE__ */ element.getBoundingClientRect();
const getBordersSizeOffsets = (computedStyle, calcEnds = true) => {
  if (computedStyle.getPropertyValue("box-sizing") === "border-box") {
    return void 0;
  }
  const left = pxToNumber(computedStyle.getPropertyValue("border-left-width"));
  if (left === void 0) {
    console.error("Splitpanes Error: Fail to parse container `border-left-width`.");
    return void 0;
  }
  const top = pxToNumber(computedStyle.getPropertyValue("border-top-width"));
  if (top === void 0) {
    console.error("Splitpanes Error: Fail to parse container `border-top-width`.");
    return void 0;
  }
  const result = { left, top };
  if (calcEnds) {
    const right = pxToNumber(computedStyle.getPropertyValue("border-right-width"));
    if (right === void 0) {
      console.error("Splitpanes Error: Fail to parse container `border-right-width`.");
      return void 0;
    }
    const bottom = pxToNumber(computedStyle.getPropertyValue("border-bottom-width"));
    if (bottom === void 0) {
      console.error("Splitpanes Error: Fail to parse container `border-bottom-width`.");
      return void 0;
    }
    const resultExtended = result;
    resultExtended.right = right;
    resultExtended.bottom = bottom;
  }
  return result;
};
function elementRectWithoutBorder(element, computedStyle) {
  if (!computedStyle) {
    computedStyle = calcComputedStyle(element);
  }
  const rect = getElementRect(element);
  const borderOffsets = getBordersSizeOffsets(computedStyle, true) || { left: 0, top: 0, right: 0, bottom: 0 };
  return {
    width: rect.width - borderOffsets.left - borderOffsets.right,
    height: rect.height - borderOffsets.top - borderOffsets.bottom,
    left: rect.left + borderOffsets.left,
    top: rect.top + borderOffsets.top
  };
}
const positionDiff = (to, from) => ({
  left: to.left - from.left,
  top: to.top - from.top
});
function getGlobalMousePosition(event) {
  const eventMouse = event;
  const eventTouch = event;
  const { clientX, clientY } = "ontouchstart" in window && eventTouch.touches ? eventTouch.touches[0] : eventMouse;
  return { left: clientX, top: clientY };
}
function sumPartial(arr, start, end, valueFunction) {
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += valueFunction(arr[i], i);
  }
  return sum;
}
function forEachPartial(arr, start, end, callback) {
  for (let i = start; i < end; i++) {
    callback(arr[i], i);
  }
}
const css$5 = {
  code: "div.splitpanes--horizontal.splitpanes--dragging{cursor:row-resize}div.splitpanes--vertical.splitpanes--dragging{cursor:col-resize}.splitpanes{display:flex;width:100%;height:100%}.splitpanes--vertical{flex-direction:row}.splitpanes--horizontal{flex-direction:column}.splitpanes--dragging *{user-select:none}.splitpanes__pane{width:100%;height:100%;overflow:hidden}.splitpanes--vertical .splitpanes__pane{transition:width 0.2s ease-out}.splitpanes--horizontal .splitpanes__pane{transition:height 0.2s ease-out}.splitpanes--vertical>.splitpanes__pane{transition:width 0.2s ease-out}.splitpanes--horizontal>.splitpanes__pane{transition:height 0.2s ease-out}.splitpanes--dragging .splitpanes__pane{transition:none;pointer-events:none}.splitpanes--freeze .splitpanes__pane{transition:none}.splitpanes__splitter{touch-action:none}.splitpanes--vertical>.splitpanes__splitter{min-width:1px}.splitpanes--horizontal>.splitpanes__splitter{min-height:1px}.splitpanes.default-theme .splitpanes__pane{background-color:#f2f2f2}.splitpanes.default-theme .splitpanes__splitter{background-color:#fff;box-sizing:border-box;position:relative;flex-shrink:0}.splitpanes.default-theme .splitpanes__splitter:before,.splitpanes.default-theme .splitpanes__splitter:after{content:'';position:absolute;top:50%;left:50%;background-color:rgba(0, 0, 0, 0.15);transition:background-color 0.3s}.splitpanes.default-theme .splitpanes__splitter:hover:before,.splitpanes.default-theme .splitpanes__splitter:hover:after{background-color:rgba(0, 0, 0, 0.25)}.splitpanes.default-theme .splitpanes__splitter:first-child{cursor:auto}.default-theme.splitpanes .splitpanes .splitpanes__splitter{z-index:1}.default-theme.splitpanes--vertical>.splitpanes__splitter,.default-theme .splitpanes--vertical>.splitpanes__splitter{width:7px;border-left:1px solid #eee;cursor:col-resize}.default-theme.splitpanes--vertical>.splitpanes__splitter:before,.default-theme.splitpanes--vertical>.splitpanes__splitter:after,.default-theme .splitpanes--vertical>.splitpanes__splitter:before,.default-theme .splitpanes--vertical>.splitpanes__splitter:after{transform:translateY(-50%);width:1px;height:30px}.default-theme.splitpanes--vertical>.splitpanes__splitter:before,.default-theme .splitpanes--vertical>.splitpanes__splitter:before{margin-left:-2px}.default-theme.splitpanes--vertical>.splitpanes__splitter:after,.default-theme .splitpanes--vertical>.splitpanes__splitter:after{margin-left:1px}.default-theme.splitpanes--horizontal>.splitpanes__splitter,.default-theme .splitpanes--horizontal>.splitpanes__splitter{height:7px;border-top:1px solid #eee;cursor:row-resize}.default-theme.splitpanes--horizontal>.splitpanes__splitter:before,.default-theme.splitpanes--horizontal>.splitpanes__splitter:after,.default-theme .splitpanes--horizontal>.splitpanes__splitter:before,.default-theme .splitpanes--horizontal>.splitpanes__splitter:after{transform:translateX(-50%);width:30px;height:1px}.default-theme.splitpanes--horizontal>.splitpanes__splitter:before,.default-theme .splitpanes--horizontal>.splitpanes__splitter:before{margin-top:-2px}.default-theme.splitpanes--horizontal>.splitpanes__splitter:after,.default-theme .splitpanes--horizontal>.splitpanes__splitter:after{margin-top:1px}",
  map: "{\"version\":3,\"file\":\"Splitpanes.svelte\",\"sources\":[\"Splitpanes.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport const KEY = {};\\n\\t/**\\n\\t * the third argument for event bundler\\n\\t * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md\\n\\t */\\n\\tconst thirdEventArg = (() => {\\n\\t\\tlet result = false;\\n\\t\\ttry {\\n\\t\\t\\tconst arg = Object.defineProperty({}, 'passive', {\\n\\t\\t\\t\\tget() {\\n\\t\\t\\t\\t\\tresult = { passive: true };\\n\\t\\t\\t\\t\\treturn true;\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\t\\t\\t// @ts-expect-error no overload matches\\n\\t\\t\\twindow.addEventListener('testpassive', arg, arg);\\n\\t\\t\\t// @ts-expect-error no overload matches\\n\\t\\t\\twindow.remove('testpassive', arg, arg);\\n\\t\\t} catch (_e) {\\n\\t\\t\\t/* */\\n\\t\\t}\\n\\t\\treturn result;\\n\\t})();\\n<\/script>\\n\\n<script strictEvents>\\n\\timport { onMount, onDestroy, setContext, createEventDispatcher, tick, afterUpdate } from 'svelte';\\n\\timport { writable } from 'svelte/store';\\n\\timport GatheringRound from './internal/GatheringRound.svelte';\\n\\timport { browser } from './internal/env.js';\\n\\timport { getDimensionName } from './internal/utils/sizing.js';\\n\\timport {\\n\\t\\telementRectWithoutBorder,\\n\\t\\tgetGlobalMousePosition,\\n\\t\\tpositionDiff,\\n\\t\\tgetElementRect\\n\\t} from './internal/utils/position.js';\\n\\timport { forEachPartial, sumPartial } from './internal/utils/array.js';\\n\\timport { calcComputedStyle } from './internal/utils/styling.js';\\n\\t// PROPS ----------------\\n\\t//@ts-expect-error undefined not assigned to string\\n\\texport let id = undefined;\\n\\t// horiz or verti?\\n\\texport let horizontal = false;\\n\\t// when true, moving a splitter can push other panes\\n\\texport let pushOtherPanes = true;\\n\\t// open/close on double click\\n\\texport let dblClickSplitter = true;\\n\\t// true if RTL\\n\\texport let rtl = 'auto';\\n\\t// true to display the first splitter\\n\\texport let firstSplitter = false;\\n\\t// css style\\n\\texport let style = null;\\n\\t// the splitter theme to use\\n\\texport let theme = 'splitpanes-theme';\\n\\t// css class\\n\\tlet clazz = '';\\n\\texport { clazz as class };\\n\\t// VARIABLES ----------------\\n\\t//used to bubble events up\\n\\tconst dispatch = createEventDispatcher();\\n\\t// the splitpane component\\n\\tlet container;\\n\\t// true when component is ready, prevents emitting console warnings on hot reloading.\\n\\tlet isReady = false;\\n\\t// true when pane reset is awaiting for the next tick, to avoid double call to pane reset.\\n\\tlet isAwaitingPaneReset = false;\\n\\t// true after the initial timeout 0 waiting, prevents CSS transitions until then.\\n\\tlet isAfterInitialTimeoutZero = false;\\n\\t// true when mouse is down\\n\\tlet isMouseDown = false;\\n\\t// true when a splitter is being dragged\\n\\tlet isDragging = false;\\n\\t// that's the splitter than is being dragged\\n\\tlet activeSplitter = -1;\\n\\t// that's well the clicked splitter!\\n\\tlet clickedSplitter = -1;\\n\\t// used to detect double clicks\\n\\tlet timeoutId;\\n\\t// panes per insertion order (pane.index is the order index)\\n\\tlet panes = new Array();\\n\\t// passed to the children via the context - writable to ensure proper reactivity\\n\\tconst isHorizontal = writable(horizontal);\\n\\tconst showFirstSplitter = writable(firstSplitter);\\n\\t// tells the key of the very first pane, or undefined if not recieved yet\\n\\tconst veryFirstPaneKey = writable(undefined);\\n\\tlet activeSplitterElement;\\n\\tlet activeSplitterDrag;\\n\\tlet ssrPaneDefinedSizeSum = 0;\\n\\tlet ssrPaneUndefinedSizeCount = 0;\\n\\t// REACTIVE ----------------\\n\\t$: $isHorizontal = horizontal;\\n\\t$: $showFirstSplitter = firstSplitter;\\n\\tfunction ssrRegisterPaneSize(size) {\\n\\t\\tif (size == null) {\\n\\t\\t\\t++ssrPaneUndefinedSizeCount;\\n\\t\\t} else {\\n\\t\\t\\tssrPaneDefinedSizeSum += size;\\n\\t\\t}\\n\\t}\\n\\tconst onPaneInit = (_key) => {\\n\\t\\tif ($veryFirstPaneKey === undefined) {\\n\\t\\t\\t$veryFirstPaneKey = _key;\\n\\t\\t}\\n\\t\\treturn {\\n\\t\\t\\tundefinedPaneInitSize: browser ? 0 : (100 - ssrPaneDefinedSizeSum) / ssrPaneUndefinedSizeCount\\n\\t\\t};\\n\\t};\\n\\tsetContext(KEY, {\\n\\t\\tshowFirstSplitter,\\n\\t\\tveryFirstPaneKey,\\n\\t\\tisHorizontal,\\n\\t\\tssrRegisterPaneSize: browser ? undefined : ssrRegisterPaneSize,\\n\\t\\tonPaneInit,\\n\\t\\tclientOnly: browser\\n\\t\\t\\t? {\\n\\t\\t\\t\\t\\tonPaneAdd,\\n\\t\\t\\t\\t\\tonPaneRemove\\n\\t\\t\\t\\t}\\n\\t\\t\\t: undefined\\n\\t});\\n\\tfunction onPaneAdd(pane) {\\n\\t\\t// 1. Add pane to array at the same index it was inserted in the <splitpanes> tag.\\n\\t\\tlet index = -1;\\n\\t\\tif (pane.element.parentNode) {\\n\\t\\t\\tArray.from(pane.element.parentNode.children).some((el) => {\\n\\t\\t\\t\\tif (el.className.includes('splitpanes__pane')) index++;\\n\\t\\t\\t\\treturn el === pane.element;\\n\\t\\t\\t});\\n\\t\\t}\\n\\t\\tif (index === 0) {\\n\\t\\t\\t// Need to update the first pane key, because the first pane can be changed in runtime.\\n\\t\\t\\t$veryFirstPaneKey = pane.key;\\n\\t\\t}\\n\\t\\t//inserts pane at proper array index\\n\\t\\tpanes.splice(index, 0, pane);\\n\\t\\t// reindex panes\\n\\t\\tfor (let i = 0; i < panes.length; i++) {\\n\\t\\t\\tpanes[i].index = i;\\n\\t\\t}\\n\\t\\tif (isReady) {\\n\\t\\t\\t// 2. tick and resize the panes.\\n\\t\\t\\ttickAndResetPaneSizes().then(() => {\\n\\t\\t\\t\\t// 3. Set the pane as ready\\n\\t\\t\\t\\tpane.isReady = true;\\n\\t\\t\\t\\t// 4. Fire `pane-add` event.\\n\\t\\t\\t\\tdispatch('pane-add', {\\n\\t\\t\\t\\t\\tindex,\\n\\t\\t\\t\\t\\tpanes: prepareSizeEvent()\\n\\t\\t\\t\\t});\\n\\t\\t\\t});\\n\\t\\t}\\n\\t\\tconst paneForward =\\n\\t\\t\\t(cb, includingFirst = true) =>\\n\\t\\t\\t(value) => {\\n\\t\\t\\t\\tif (includingFirst || pane.index > 0) {\\n\\t\\t\\t\\t\\tcb(value, pane);\\n\\t\\t\\t\\t}\\n\\t\\t\\t};\\n\\t\\treturn {\\n\\t\\t\\tonSplitterDown: paneForward(onMouseDown, false),\\n\\t\\t\\tonSplitterClick: paneForward(onSplitterClick, false),\\n\\t\\t\\tonSplitterDblClick: paneForward(onSplitterDblClick),\\n\\t\\t\\tonPaneClick: paneForward(onPaneClick),\\n\\t\\t\\treportGivenSizeChange: paneForward(reportGivenSizeChange)\\n\\t\\t};\\n\\t}\\n\\tasync function onPaneRemove(key) {\\n\\t\\t// 1. Remove the pane from array and redo indexes.\\n\\t\\tconst index = panes.findIndex((p) => p.key === key);\\n\\t\\t// race condition - typically happens when the dev server restarts\\n\\t\\tif (index >= 0) {\\n\\t\\t\\tconst removed = panes.splice(index, 1)[0];\\n\\t\\t\\t// reindex panes\\n\\t\\t\\tfor (let i = 0; i < panes.length; i++) {\\n\\t\\t\\t\\tpanes[i].index = i;\\n\\t\\t\\t}\\n\\t\\t\\tif (index === 0) {\\n\\t\\t\\t\\t$veryFirstPaneKey = panes.length > 0 ? panes[0].key : undefined;\\n\\t\\t\\t}\\n\\t\\t\\tif (isReady) {\\n\\t\\t\\t\\t// 3. tick and resize the panes.\\n\\t\\t\\t\\tawait tickAndResetPaneSizes();\\n\\t\\t\\t\\t// 4. Fire `pane-remove` event.\\n\\t\\t\\t\\tdispatch('pane-remove', {\\n\\t\\t\\t\\t\\tremoved,\\n\\t\\t\\t\\t\\tpanes: prepareSizeEvent()\\n\\t\\t\\t\\t});\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n\\t// called by sub-panes\\n\\tfunction onPaneClick(_event, pane) {\\n\\t\\tdispatch('pane-click', pane);\\n\\t}\\n\\tfunction reportGivenSizeChange(newGivenSize, pane) {\\n\\t\\tpane.setSz(newGivenSize);\\n\\t\\ttickAndResetPaneSizes();\\n\\t}\\n\\tonMount(() => {\\n\\t\\tverifyAndUpdatePanesOrder();\\n\\t\\tresetPaneSizes();\\n\\t\\tfor (let i = 0; i < panes.length; i++) {\\n\\t\\t\\tpanes[i].isReady = true;\\n\\t\\t}\\n\\t\\tisReady = true;\\n\\t\\tdispatch('ready');\\n\\t\\tsetTimeout(() => {\\n\\t\\t\\tisAfterInitialTimeoutZero = true;\\n\\t\\t}, 0);\\n\\t});\\n\\tif (browser) {\\n\\t\\tonDestroy(() => {\\n\\t\\t\\tif (isReady) {\\n\\t\\t\\t\\t// this is to solve an edge case:\\n\\t\\t\\t\\t// when the user starts dragging and the component is destroyed, leaving behind hanging events\\n\\t\\t\\t\\tunbindEvents();\\n\\t\\t\\t}\\n\\t\\t\\t// Prevent emitting console warnings on hot reloading.\\n\\t\\t\\tisReady = false;\\n\\t\\t});\\n\\t}\\n\\tafterUpdate(() => {\\n\\t\\tverifyAndUpdatePanesOrder();\\n\\t});\\n\\t// Tells in the current DOM state if we are in RTL direction or not.\\n\\tfunction isRTL(containerComputedStyle) {\\n\\t\\tif (rtl === 'auto') {\\n\\t\\t\\t// the try catch is to support old browser, flag is preset to false\\n\\t\\t\\ttry {\\n\\t\\t\\t\\treturn (containerComputedStyle ?? calcComputedStyle(container)).direction === 'rtl';\\n\\t\\t\\t} catch (_err) {\\n\\t\\t\\t\\t// We want application to not crush, but don't care about the message\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\t// otherwise\\n\\t\\treturn rtl === true;\\n\\t}\\n\\tfunction bindEvents() {\\n\\t\\tdocument.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize';\\n\\t\\tdocument.addEventListener('mousemove', onMouseMove, thirdEventArg);\\n\\t\\tdocument.addEventListener('mouseup', onMouseUp);\\n\\t\\tif ('ontouchstart' in window) {\\n\\t\\t\\tdocument.addEventListener('touchmove', onMouseMove, thirdEventArg);\\n\\t\\t\\tdocument.addEventListener('touchend', onMouseUp);\\n\\t\\t}\\n\\t}\\n\\tfunction unbindEvents() {\\n\\t\\tdocument.body.style.cursor = '';\\n\\t\\tdocument.removeEventListener('mousemove', onMouseMove);\\n\\t\\tdocument.removeEventListener('mouseup', onMouseUp);\\n\\t\\tif ('ontouchstart' in window) {\\n\\t\\t\\tdocument.removeEventListener('touchmove', onMouseMove);\\n\\t\\t\\tdocument.removeEventListener('touchend', onMouseUp);\\n\\t\\t}\\n\\t}\\n\\tconst isSplitterElement = (node) =>\\n\\t\\tnode.nodeType === Node.ELEMENT_NODE && node.classList.contains('splitpanes__splitter');\\n\\tfunction getOrientedDiff(drag, elementSize, isRTL) {\\n\\t\\tlet tdrag = drag[horizontal ? 'top' : 'left'];\\n\\t\\tif (isRTL && !horizontal) tdrag = elementSize - tdrag;\\n\\t\\treturn tdrag;\\n\\t}\\n\\tconst getCurrentDimensionName = () => getDimensionName(horizontal);\\n\\tfunction onMouseDown(event, splitterPane) {\\n\\t\\tisMouseDown = true;\\n\\t\\tactiveSplitter = splitterPane.index;\\n\\t\\tsplitterPane.setSplitterActive(true);\\n\\t\\tconst paneElement = splitterPane.element;\\n\\t\\tlet activeSplitterNode = paneElement;\\n\\t\\twhile (activeSplitterNode != null) {\\n\\t\\t\\tactiveSplitterNode = activeSplitterNode.previousSibling;\\n\\t\\t\\tif (activeSplitterNode && isSplitterElement(activeSplitterNode)) {\\n\\t\\t\\t\\tbreak;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tif (activeSplitterNode == null) {\\n\\t\\t\\tconsole.error(\\\"Splitpane Error: Active splitter wasn't found!\\\");\\n\\t\\t\\treturn; // Don't bind move event on error\\n\\t\\t}\\n\\t\\tactiveSplitterElement = activeSplitterNode;\\n\\t\\tconst globalMousePosition = getGlobalMousePosition(event);\\n\\t\\tconst splitterRect = getElementRect(activeSplitterElement);\\n\\t\\tactiveSplitterDrag = getOrientedDiff(\\n\\t\\t\\tpositionDiff(globalMousePosition, splitterRect),\\n\\t\\t\\tsplitterRect[getCurrentDimensionName()],\\n\\t\\t\\tisRTL()\\n\\t\\t);\\n\\t\\tbindEvents();\\n\\t}\\n\\tfunction onMouseMove(event) {\\n\\t\\tif (isMouseDown) {\\n\\t\\t\\tisDragging = true;\\n\\t\\t\\tconst globalMousePosition = getGlobalMousePosition(event);\\n\\t\\t\\tconst containerComputedStyle = calcComputedStyle(container);\\n\\t\\t\\tconst containerRectWithoutBorder = elementRectWithoutBorder(\\n\\t\\t\\t\\tcontainer,\\n\\t\\t\\t\\tcontainerComputedStyle\\n\\t\\t\\t);\\n\\t\\t\\tconst containerSizeWithoutBorder = containerRectWithoutBorder[getCurrentDimensionName()];\\n\\t\\t\\tconst _isRTL = isRTL(containerComputedStyle);\\n\\t\\t\\tconst currentMouseDrag = positionDiff(globalMousePosition, containerRectWithoutBorder);\\n\\t\\t\\tconst tdrag = getOrientedDiff(currentMouseDrag, containerSizeWithoutBorder, _isRTL);\\n\\t\\t\\tcalculatePanesSize(tdrag, containerSizeWithoutBorder);\\n\\t\\t\\tdispatch('resize', prepareSizeEvent());\\n\\t\\t}\\n\\t}\\n\\tfunction onMouseUp() {\\n\\t\\tif (isDragging) {\\n\\t\\t\\tdispatch('resized', prepareSizeEvent());\\n\\t\\t}\\n\\t\\tisMouseDown = false;\\n\\t\\tconst pane = panes[activeSplitter];\\n\\t\\tpane.setSplitterActive(false);\\n\\t\\t// Keep dragging flag until click event is finished (click happens immediately after mouseup)\\n\\t\\t// in order to prevent emitting `splitter-click` event if splitter was dragged.\\n\\t\\tsetTimeout(() => {\\n\\t\\t\\tisDragging = false;\\n\\t\\t\\tunbindEvents();\\n\\t\\t}, 100);\\n\\t}\\n\\t// If touch device, detect double tap manually (2 taps separated by less than 500ms).\\n\\tfunction onSplitterClick(event, splitterPane) {\\n\\t\\tif ('ontouchstart' in window) {\\n\\t\\t\\tconst splitterIndex = splitterPane.index;\\n\\t\\t\\t// Detect splitter double taps if the option is on.\\n\\t\\t\\tif (dblClickSplitter) {\\n\\t\\t\\t\\tif (clickedSplitter === splitterIndex) {\\n\\t\\t\\t\\t\\tif (timeoutId) clearTimeout(timeoutId);\\n\\t\\t\\t\\t\\ttimeoutId = null;\\n\\t\\t\\t\\t\\tonSplitterDblClick(event, splitterPane);\\n\\t\\t\\t\\t\\tclickedSplitter = -1; // Reset for the next tap check.\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tclickedSplitter = splitterIndex;\\n\\t\\t\\t\\t\\ttimeoutId = setTimeout(() => {\\n\\t\\t\\t\\t\\t\\tclickedSplitter = -1;\\n\\t\\t\\t\\t\\t}, 500);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tif (!isDragging) dispatch('splitter-click', splitterPane);\\n\\t}\\n\\t// On splitter dbl click or dbl tap maximize this pane.\\n\\tfunction onSplitterDblClick(_event, splitterPane) {\\n\\t\\tif (dblClickSplitter) {\\n\\t\\t\\tconst splitterIndex = splitterPane.index;\\n\\t\\t\\tlet totalMinSizes = 0;\\n\\t\\t\\tfor (let i = 0; i < panes.length; i++) {\\n\\t\\t\\t\\tconst pane = panes[i];\\n\\t\\t\\t\\tif (i !== splitterIndex) {\\n\\t\\t\\t\\t\\ttotalMinSizes += pane.min();\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\tconst maxExtendedSize = Math.min(Math.max(0, 100 - totalMinSizes), splitterPane.max());\\n\\t\\t\\tconst totalMaxExtendedPlusMinSizes = totalMinSizes + maxExtendedSize;\\n\\t\\t\\tif (totalMaxExtendedPlusMinSizes >= 100) {\\n\\t\\t\\t\\t// put everything to the minimum, and in the splitterPane put the rest of the size\\n\\t\\t\\t\\tfor (let i = 0; i < panes.length; i++) {\\n\\t\\t\\t\\t\\tconst pane = panes[i];\\n\\t\\t\\t\\t\\tif (pane !== splitterPane) {\\n\\t\\t\\t\\t\\t\\tpane.setSz(pane.min());\\n\\t\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\t\\tpane.setSz(100 - totalMinSizes);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t} else {\\n\\t\\t\\t\\t// notice that in this case, we can conclude that `panes.length >= 2`\\n\\t\\t\\t\\t// put splitterPane to the maximum (the actual one), and the normal panes to the minimum,\\n\\t\\t\\t\\t//  and give the spare to left pane (or to the right pane, if the splitterPane is the first pane)\\n\\t\\t\\t\\t// if this spare size is beyond the pane maximum, need to pass it along to the other panes\\n\\t\\t\\t\\tlet leftSpare = 100 - totalMaxExtendedPlusMinSizes;\\n\\t\\t\\t\\tsplitterPane.setSz(maxExtendedSize);\\n\\t\\t\\t\\tconst giveBest = (pane) => {\\n\\t\\t\\t\\t\\tconst min = pane.min();\\n\\t\\t\\t\\t\\tconst max = pane.max();\\n\\t\\t\\t\\t\\tconst szExtra = Math.min(Math.max(0, leftSpare), max - min);\\n\\t\\t\\t\\t\\tpane.setSz(min + szExtra);\\n\\t\\t\\t\\t\\tleftSpare -= szExtra;\\n\\t\\t\\t\\t};\\n\\t\\t\\t\\t// go backward and give the most size as we can\\n\\t\\t\\t\\tfor (let i = splitterIndex - 1; i >= 0; i--) giveBest(panes[i]);\\n\\t\\t\\t\\t// go forward and give the most size as we can\\n\\t\\t\\t\\tfor (let i = splitterIndex + 1; i < panes.length; i++) giveBest(panes[i]);\\n\\t\\t\\t\\t// at the end of the process, we must have that `leftSpare` is 0\\n\\t\\t\\t\\tif (leftSpare != 0) {\\n\\t\\t\\t\\t\\tconsole.warn(\\n\\t\\t\\t\\t\\t\\t'Splitpanes: there is a left spare size after computation of splitter double click, which means there are issues on the size constains of the panes.'\\n\\t\\t\\t\\t\\t);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\tdispatch('pane-maximize', splitterPane);\\n\\t\\t\\tdispatch('resized', prepareSizeEvent());\\n\\t\\t}\\n\\t\\t// onMouseUp might not be called on the second click, so update the mouse state.\\n\\t\\t// TODO: Should also check and unbind events, but better IMO to not bind&unbind on every click, so ignored for now.\\n\\t\\tisMouseDown = false;\\n\\t}\\n\\tconst prepareSizeEvent = () =>\\n\\t\\tpanes.map((pane) => ({\\n\\t\\t\\tmin: pane.min(),\\n\\t\\t\\tmax: pane.max(),\\n\\t\\t\\tsize: pane.sz(),\\n\\t\\t\\tsnap: pane.snap()\\n\\t\\t}));\\n\\t/**\\n\\t * Returns the drag percentage of the splitter relative to the 2 parts it's inbetween, meaning the ratio between\\n\\t *  the size that all the panes before the splitter consumes (ignoring other splitters size) and the total size of the container.\\n\\t */\\n\\tfunction getCurrentDragPercentage(tdrag, containerSizeWithoutBorder) {\\n\\t\\t// Here we want the splitter size **including the borders**.\\n\\t\\t// We need to use `Element.getBoundingClientRect()` and not `Element.clientWidth` and `Element.clientHeight`,\\n\\t\\t//  bacause the latter round the number of pixels to integer, and additionally, they don't include the borders.\\n\\t\\tconst splitterSize = (node) => getElementRect(node)[getCurrentDimensionName()];\\n\\t\\tconst activeSplitterSize = splitterSize(activeSplitterElement);\\n\\t\\tlet splittersTotalSizeBefore = 0;\\n\\t\\tlet currentBeforeNode = activeSplitterElement.previousSibling;\\n\\t\\twhile (currentBeforeNode != null) {\\n\\t\\t\\tif (isSplitterElement(currentBeforeNode)) {\\n\\t\\t\\t\\tsplittersTotalSizeBefore += splitterSize(currentBeforeNode);\\n\\t\\t\\t}\\n\\t\\t\\tcurrentBeforeNode = currentBeforeNode.previousSibling;\\n\\t\\t}\\n\\t\\tlet splittersTotalSizeAfter = 0;\\n\\t\\tlet currentAfterNode = activeSplitterElement.nextSibling;\\n\\t\\twhile (currentAfterNode != null) {\\n\\t\\t\\tif (isSplitterElement(currentAfterNode)) {\\n\\t\\t\\t\\tsplittersTotalSizeAfter += splitterSize(currentAfterNode);\\n\\t\\t\\t}\\n\\t\\t\\tcurrentAfterNode = currentAfterNode.nextSibling;\\n\\t\\t}\\n\\t\\tconst totalSplitterBefore = splittersTotalSizeBefore + activeSplitterDrag;\\n\\t\\tconst totalSplitter = splittersTotalSizeBefore + activeSplitterSize + splittersTotalSizeAfter;\\n\\t\\t// An explanation to the mathematical computation:\\n\\t\\t//\\n\\t\\t// Let's start with the case of only two panes. If we mark the first pane size in prec\\n\\t\\t//  (thinking about it as a number between 0 to 1) as `x`, we'll get that the size of the left pane in pixels will be:\\n\\t\\t// `x*containerSizeWithoutBorder - x*totalSplitter = x*(containerSizeWithoutBorder - totalSplitter)`\\n\\t\\t// Since we want that the total size in pixels before the user mouse pointer will be `tdrag`, and we need to add the\\n\\t\\t//  size of the splitter itself that is before the mouse pointer, we get the equation:\\n\\t\\t// `x*(containerSizeWithoutBorder - totalSplitter) + activeSplitterDrag = tdrag`\\n\\t\\t//\\n\\t\\t// Now in the general case when we have many panes before the splitter, mark their precentages\\n\\t\\t//  (again, thinking about it as a number between 0 to 1) by x1,x2,...,xn we'll get the equation:\\n\\t\\t// `(x1 + ... + xn)*(containerSizeWithoutBorder - totalSplitter) + totalSplitterBefore = tdrag`\\n\\t\\t// And solving it yeild the answer:\\n\\t\\t// `x1 + ... + xn = (tdrag - totalSplitterBefore) / (containerSizeWithoutBorder - totalSplitter)`\\n\\t\\treturn ((tdrag - totalSplitterBefore) / (containerSizeWithoutBorder - totalSplitter)) * 100;\\n\\t}\\n\\t/**\\n\\t * Called when slitters are moving to adjust pane sizes\\n\\t */\\n\\tfunction calculatePanesSize(tdrag, containerSizeWithoutBorder) {\\n\\t\\tlet paneBeforeIndex = activeSplitter - 1;\\n\\t\\tlet paneBefore = panes[paneBeforeIndex];\\n\\t\\tlet paneAfterIndex = activeSplitter;\\n\\t\\tlet paneAfter = panes[paneAfterIndex];\\n\\t\\tlet sums = {\\n\\t\\t\\tprevPanesSize: sumPrevPanesSize(paneBeforeIndex),\\n\\t\\t\\tnextPanesSize: sumNextPanesSize(paneAfterIndex),\\n\\t\\t\\tprevReachedMinPanes: 0,\\n\\t\\t\\tnextReachedMinPanes: 0\\n\\t\\t};\\n\\t\\t// If not pushing other panes, panes to resize are right before and right after splitter.\\n\\t\\tconst minDrag = 0 + (pushOtherPanes ? 0 : sums.prevPanesSize);\\n\\t\\tconst maxDrag = 100 - (pushOtherPanes ? 0 : sums.nextPanesSize);\\n\\t\\t// Calculate drag percentage\\n\\t\\tconst mouseDragPercentage = Math.max(\\n\\t\\t\\tMath.min(getCurrentDragPercentage(tdrag, containerSizeWithoutBorder), maxDrag),\\n\\t\\t\\tminDrag\\n\\t\\t);\\n\\t\\t// Handle snap\\n\\t\\tconst paneBeforeSnap = sums.prevPanesSize + paneBefore.min() + paneBefore.snap();\\n\\t\\tconst paneAfterSnap = 100 - (sums.nextPanesSize + paneAfter.min() + paneAfter.snap());\\n\\t\\tlet dragPercentage = mouseDragPercentage;\\n\\t\\tlet snapped = false;\\n\\t\\tif (mouseDragPercentage <= paneBeforeSnap) {\\n\\t\\t\\tif (mouseDragPercentage > sums.prevPanesSize + paneBefore.min()) {\\n\\t\\t\\t\\tdragPercentage = Math.max(\\n\\t\\t\\t\\t\\tpaneBefore.min() + sums.prevPanesSize,\\n\\t\\t\\t\\t\\t100 - (paneAfter.max() + sums.nextPanesSize)\\n\\t\\t\\t\\t);\\n\\t\\t\\t\\tsnapped = true;\\n\\t\\t\\t}\\n\\t\\t} else if (mouseDragPercentage >= paneAfterSnap) {\\n\\t\\t\\tif (mouseDragPercentage < 100 - sums.nextPanesSize - paneAfter.min()) {\\n\\t\\t\\t\\tdragPercentage = Math.min(\\n\\t\\t\\t\\t\\t100 - (paneAfter.min() + sums.nextPanesSize),\\n\\t\\t\\t\\t\\tpaneBefore.max() + sums.prevPanesSize\\n\\t\\t\\t\\t);\\n\\t\\t\\t\\tsnapped = true;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tconst paneBeforeMaxReached =\\n\\t\\t\\tpaneBefore.max() < 100 && dragPercentage >= paneBefore.max() + sums.prevPanesSize;\\n\\t\\tconst paneAfterMaxReached =\\n\\t\\t\\tpaneAfter.max() < 100 && dragPercentage <= 100 - (paneAfter.max() + sums.nextPanesSize);\\n\\t\\t// Prevent dragging beyond pane max.\\n\\t\\tif (paneBeforeMaxReached || paneAfterMaxReached) {\\n\\t\\t\\tif (paneBeforeMaxReached) {\\n\\t\\t\\t\\tpaneBefore.setSz(paneBefore.max());\\n\\t\\t\\t\\tpaneAfter.setSz(\\n\\t\\t\\t\\t\\tMath.max(100 - paneBefore.max() - sums.prevPanesSize - sums.nextPanesSize, 0)\\n\\t\\t\\t\\t);\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tpaneBefore.setSz(\\n\\t\\t\\t\\t\\tMath.max(100 - paneAfter.max() - sums.prevPanesSize - sums.nextPanesSize, 0)\\n\\t\\t\\t\\t);\\n\\t\\t\\t\\tpaneAfter.setSz(paneAfter.max());\\n\\t\\t\\t}\\n\\t\\t} else {\\n\\t\\t\\t// When pushOtherPanes = true, find the closest expanded pane on each side of the splitter.\\n\\t\\t\\t// TODO: Bug: This should work also when removing `!snapped` condition, but it's not!\\n\\t\\t\\t//   To reproduce, reload the example page and see the example \\\"Min & max with snap\\\".\\n\\t\\t\\t//   It gets wrongly pushed when try to snap on the initial dragging of the first splitter to the right.\\n\\t\\t\\tif (pushOtherPanes && !snapped) {\\n\\t\\t\\t\\tconst vars = doPushOtherPanes(sums, dragPercentage);\\n\\t\\t\\t\\tif (!vars) {\\n\\t\\t\\t\\t\\t//\\t\\tsetAllPaneDimensions();\\n\\t\\t\\t\\t\\treturn; // Prevent other calculation.\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\t({ sums, paneBeforeIndex, paneAfterIndex } = vars);\\n\\t\\t\\t\\tpaneBefore = panes[paneBeforeIndex];\\n\\t\\t\\t\\tpaneAfter = panes[paneAfterIndex];\\n\\t\\t\\t}\\n\\t\\t\\tif (paneBeforeIndex != null) {\\n\\t\\t\\t\\tpaneBefore.setSz(\\n\\t\\t\\t\\t\\tMath.min(\\n\\t\\t\\t\\t\\t\\tMath.max(\\n\\t\\t\\t\\t\\t\\t\\tdragPercentage - sums.prevPanesSize - sums.prevReachedMinPanes,\\n\\t\\t\\t\\t\\t\\t\\tpaneBefore.min()\\n\\t\\t\\t\\t\\t\\t),\\n\\t\\t\\t\\t\\t\\tpaneBefore.max()\\n\\t\\t\\t\\t\\t)\\n\\t\\t\\t\\t);\\n\\t\\t\\t}\\n\\t\\t\\tif (paneAfterIndex != null) {\\n\\t\\t\\t\\tpaneAfter.setSz(\\n\\t\\t\\t\\t\\tMath.min(\\n\\t\\t\\t\\t\\t\\tMath.max(\\n\\t\\t\\t\\t\\t\\t\\t100 - dragPercentage - sums.nextPanesSize - sums.nextReachedMinPanes,\\n\\t\\t\\t\\t\\t\\t\\tpaneAfter.min()\\n\\t\\t\\t\\t\\t\\t),\\n\\t\\t\\t\\t\\t\\tpaneAfter.max()\\n\\t\\t\\t\\t\\t)\\n\\t\\t\\t\\t);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n\\tfunction doPushOtherPanes(sums, dragPercentage) {\\n\\t\\tconst splitterIndex = activeSplitter - 1;\\n\\t\\tlet paneBeforeIndex = splitterIndex;\\n\\t\\tlet paneAfterIndex = splitterIndex + 1;\\n\\t\\t// Pushing Down.\\n\\t\\t// Going smaller than the current pane min size: take the previous expanded pane.\\n\\t\\tif (dragPercentage < sums.prevPanesSize + panes[paneBeforeIndex].min()) {\\n\\t\\t\\tpaneBeforeIndex = findPrevExpandedPane(splitterIndex)?.index || 0;\\n\\t\\t\\tsums.prevReachedMinPanes = 0;\\n\\t\\t\\t// If pushing a n-2 or less pane, from splitter, then make sure all in between is at min size.\\n\\t\\t\\tif (paneBeforeIndex < splitterIndex) {\\n\\t\\t\\t\\tforEachPartial(panes, paneBeforeIndex + 1, splitterIndex + 1, (pane) => {\\n\\t\\t\\t\\t\\tpane.setSz(pane.min());\\n\\t\\t\\t\\t\\tsums.prevReachedMinPanes += pane.min();\\n\\t\\t\\t\\t});\\n\\t\\t\\t}\\n\\t\\t\\tsums.prevPanesSize = sumPrevPanesSize(paneBeforeIndex);\\n\\t\\t\\t// If nothing else to push down, cancel dragging.\\n\\t\\t\\tif (paneBeforeIndex == null) {\\n\\t\\t\\t\\tsums.prevReachedMinPanes = 0;\\n\\t\\t\\t\\tpanes[0].setSz(panes[0].min());\\n\\t\\t\\t\\tforEachPartial(panes, 1, splitterIndex + 1, (pane) => {\\n\\t\\t\\t\\t\\tpane.setSz(pane.min());\\n\\t\\t\\t\\t\\tsums.prevReachedMinPanes += pane.min();\\n\\t\\t\\t\\t});\\n\\t\\t\\t\\tpanes[paneAfterIndex].setSz(\\n\\t\\t\\t\\t\\t100 - sums.prevReachedMinPanes - panes[0].min() - sums.prevPanesSize - sums.nextPanesSize\\n\\t\\t\\t\\t);\\n\\t\\t\\t\\treturn null;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\t// Pushing Up.\\n\\t\\t// Pushing up beyond min size is reached: take the next expanded pane.\\n\\t\\tif (dragPercentage > 100 - sums.nextPanesSize - panes[paneAfterIndex].min()) {\\n\\t\\t\\tpaneAfterIndex = findNextExpandedPane(splitterIndex)?.index || 0;\\n\\t\\t\\tsums.nextReachedMinPanes = 0;\\n\\t\\t\\t// If pushing a n+2 or more pane, from splitter, then make sure all in between is at min size.\\n\\t\\t\\tif (paneAfterIndex > splitterIndex + 1) {\\n\\t\\t\\t\\tforEachPartial(panes, splitterIndex + 1, paneAfterIndex, (pane) => {\\n\\t\\t\\t\\t\\tpane.setSz(pane.min());\\n\\t\\t\\t\\t\\tsums.nextReachedMinPanes += pane.min();\\n\\t\\t\\t\\t});\\n\\t\\t\\t}\\n\\t\\t\\tsums.nextPanesSize = sumNextPanesSize(paneAfterIndex);\\n\\t\\t\\t// If nothing else to push up, cancel dragging.\\n\\t\\t\\tconst panesCount = panes.length;\\n\\t\\t\\tif (paneAfterIndex == null) {\\n\\t\\t\\t\\tsums.nextReachedMinPanes = 0;\\n\\t\\t\\t\\tpanes[panesCount - 1].setSz(panes[panesCount - 1].min());\\n\\t\\t\\t\\tforEachPartial(panes, splitterIndex + 1, panesCount - 1, (pane) => {\\n\\t\\t\\t\\t\\tpane.setSz(pane.min());\\n\\t\\t\\t\\t\\tsums.nextReachedMinPanes += pane.min();\\n\\t\\t\\t\\t});\\n\\t\\t\\t\\tpanes[paneBeforeIndex].setSz(\\n\\t\\t\\t\\t\\t100 -\\n\\t\\t\\t\\t\\t\\tsums.prevPanesSize -\\n\\t\\t\\t\\t\\t\\tsums.nextReachedMinPanes -\\n\\t\\t\\t\\t\\t\\tpanes[panesCount - 1].min() -\\n\\t\\t\\t\\t\\t\\tsums.nextPanesSize\\n\\t\\t\\t\\t);\\n\\t\\t\\t\\treturn null;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn { sums, paneBeforeIndex, paneAfterIndex };\\n\\t}\\n\\tconst getSizeOfPane = (pane) => pane.sz();\\n\\tconst sumPrevPanesSize = (splitterIndex) => sumPartial(panes, 0, splitterIndex, getSizeOfPane);\\n\\tconst sumNextPanesSize = (splitterIndex) =>\\n\\t\\tsumPartial(panes, splitterIndex + 1, panes.length, getSizeOfPane);\\n\\t// Return the previous pane from siblings which has a size (width for vert or height for horz) of more than 0.\\n\\tconst findPrevExpandedPane = (splitterIndex) =>\\n\\t\\t[...panes].reverse().find((p) => p.index < splitterIndex && p.sz() > p.min());\\n\\t// Return the next pane from siblings which has a size (width for vert or height for horz) of more than 0.\\n\\tconst findNextExpandedPane = (splitterIndex) =>\\n\\t\\tpanes.find((p) => p.index > splitterIndex + 1 && p.sz() > p.min());\\n\\tasync function tickAndResetPaneSizes() {\\n\\t\\tisAwaitingPaneReset = true;\\n\\t\\tawait tick();\\n\\t\\tif (isAwaitingPaneReset) {\\n\\t\\t\\tresetPaneSizes();\\n\\t\\t\\tisAwaitingPaneReset = false;\\n\\t\\t}\\n\\t}\\n\\t/**\\n\\t *\\n\\t * @param addedPane\\n\\t * @param removedPane\\n\\t */\\n\\tfunction resetPaneSizes() {\\n\\t\\tequalize();\\n\\t\\tif (isReady) dispatch('resized', prepareSizeEvent());\\n\\t}\\n\\tfunction equalize() {\\n\\t\\t// Escape the function on the edge case that there is not even a single pane\\n\\t\\tif (panes.length === 0) {\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\t\\t// otherwise\\n\\t\\tconst panesCount = panes.length;\\n\\t\\tlet leftToAllocate = 100;\\n\\t\\tlet definedSizesCount = 0;\\n\\t\\tlet undefinedSizesNotReadyCount = 0;\\n\\t\\tlet undefinedSizesSum = 0;\\n\\t\\tconst ungrowable = [];\\n\\t\\tconst unshrinkable = [];\\n\\t\\tfor (let i = 0; i < panesCount; i++) {\\n\\t\\t\\tconst pane = panes[i];\\n\\t\\t\\tconst sz = pane.sz();\\n\\t\\t\\tif (pane.givenSize == null) {\\n\\t\\t\\t\\tif (pane.isReady) {\\n\\t\\t\\t\\t\\tundefinedSizesSum += sz;\\n\\t\\t\\t\\t\\tif (sz >= pane.max()) ungrowable.push(pane);\\n\\t\\t\\t\\t\\tif (sz <= pane.min()) unshrinkable.push(pane);\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tundefinedSizesNotReadyCount += 1;\\n\\t\\t\\t\\t}\\n\\t\\t\\t} else {\\n\\t\\t\\t\\t// if the size is defined, we don't modify its size at all\\n\\t\\t\\t\\tleftToAllocate -= sz;\\n\\t\\t\\t\\tdefinedSizesCount++;\\n\\t\\t\\t\\tungrowable.push(pane);\\n\\t\\t\\t\\tunshrinkable.push(pane);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tconst undefinedSizesCount = panesCount - definedSizesCount;\\n\\t\\tconst undefinedSizesReadyCount = undefinedSizesCount - undefinedSizesNotReadyCount;\\n\\t\\t// the proportion of the newly added panes\\n\\t\\tlet undefinedSizesNotReadySz;\\n\\t\\tlet undefinedScaleFactor;\\n\\t\\tif (undefinedSizesReadyCount > 0) {\\n\\t\\t\\t// if has undefined sizes panes that are ready:\\n\\t\\t\\tundefinedSizesNotReadySz = undefinedSizesSum / undefinedSizesReadyCount;\\n\\t\\t\\tif (undefinedSizesNotReadySz > 0.1 && leftToAllocate > 0.1) {\\n\\t\\t\\t\\tundefinedSizesSum += undefinedSizesNotReadyCount * undefinedSizesNotReadySz;\\n\\t\\t\\t\\tundefinedScaleFactor = leftToAllocate / undefinedSizesSum;\\n\\t\\t\\t} else {\\n\\t\\t\\t\\t// when the size of the ready undefined panes shares are negligible, need to set the not ready\\n\\t\\t\\t\\t//  undefined one to size 0, for being \\\"proportional\\\" to negligible sizes\\n\\t\\t\\t\\tundefinedSizesNotReadySz = 0;\\n\\t\\t\\t\\tundefinedScaleFactor = 1;\\n\\t\\t\\t}\\n\\t\\t} else {\\n\\t\\t\\t// otherwise, divide the space of the undefined sizes panes equally:\\n\\t\\t\\tundefinedSizesNotReadySz = leftToAllocate / undefinedSizesCount;\\n\\t\\t\\tundefinedScaleFactor = 1;\\n\\t\\t}\\n\\t\\t// whenever `leftToAllocate` or `undefinedSizesSum` aren't negligible, need to adjact the sizes\\n\\t\\tif (leftToAllocate + undefinedSizesSum > 0.1) {\\n\\t\\t\\tleftToAllocate = 100; // reset the space calculation\\n\\t\\t\\tfor (let i = 0; i < panesCount; i++) {\\n\\t\\t\\t\\tconst pane = panes[i];\\n\\t\\t\\t\\tif (pane.givenSize == null) {\\n\\t\\t\\t\\t\\t// add the proportion of the newly added pane if has undefined size\\n\\t\\t\\t\\t\\tconst currentSz = pane.isReady ? pane.sz() : undefinedSizesNotReadySz;\\n\\t\\t\\t\\t\\tconst sz = Math.max(Math.min(currentSz * undefinedScaleFactor, pane.max()), pane.min());\\n\\t\\t\\t\\t\\tpane.setSz(sz);\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\tleftToAllocate -= pane.sz();\\n\\t\\t\\t}\\n\\t\\t\\t// since we multiply by scaling, there might be left space that is needed to be saturated\\n\\t\\t\\tif (Math.abs(leftToAllocate) > 0.1) {\\n\\t\\t\\t\\tleftToAllocate = readjustSizes(leftToAllocate, ungrowable, unshrinkable);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tif (!isFinite(leftToAllocate)) {\\n\\t\\t\\tconsole.warn('Splitpanes: Internal error, sizes might be NaN as a result.');\\n\\t\\t} else if (Math.abs(leftToAllocate) > 0.1) {\\n\\t\\t\\tconsole.warn('Splitpanes: Could not resize panes correctly due to their constraints.');\\n\\t\\t}\\n\\t}\\n\\t// Second loop to adjust sizes now that we know more about the panes constraints.\\n\\tfunction readjustSizes(leftToAllocate, ungrowable, unshrinkable) {\\n\\t\\tconst panesCount = panes.length;\\n\\t\\tconst panesSizableCount =\\n\\t\\t\\tpanesCount - (leftToAllocate > 0 ? ungrowable.length : unshrinkable.length);\\n\\t\\tif (panesSizableCount <= 0) {\\n\\t\\t\\treturn leftToAllocate;\\n\\t\\t}\\n\\t\\tconst equalSpaceToAllocate = leftToAllocate / panesSizableCount;\\n\\t\\tif (panes.length === 1) {\\n\\t\\t\\tpanes[0].setSz(100);\\n\\t\\t\\tleftToAllocate = 0;\\n\\t\\t} else\\n\\t\\t\\tfor (let i = 0; i < panes.length; i++) {\\n\\t\\t\\t\\tconst pane = panes[i];\\n\\t\\t\\t\\tconst sz = pane.sz();\\n\\t\\t\\t\\tif (leftToAllocate > 0 && !ungrowable.includes(pane)) {\\n\\t\\t\\t\\t\\t// Need to diff the size before and after to get the exact allocated space.\\n\\t\\t\\t\\t\\tconst newPaneSize = Math.max(Math.min(sz + equalSpaceToAllocate, pane.max()), pane.min());\\n\\t\\t\\t\\t\\tconst allocated = newPaneSize - sz;\\n\\t\\t\\t\\t\\tleftToAllocate -= allocated;\\n\\t\\t\\t\\t\\tpane.setSz(newPaneSize);\\n\\t\\t\\t\\t} else if (!unshrinkable.includes(pane)) {\\n\\t\\t\\t\\t\\t// Need to diff the size before and after to get the exact allocated space.\\n\\t\\t\\t\\t\\tconst newPaneSize = Math.max(Math.min(sz + equalSpaceToAllocate, pane.max()), pane.min());\\n\\t\\t\\t\\t\\tconst allocated = newPaneSize - sz;\\n\\t\\t\\t\\t\\tleftToAllocate -= allocated;\\n\\t\\t\\t\\t\\tpane.setSz(newPaneSize);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\treturn leftToAllocate;\\n\\t}\\n\\t/**\\n * Checks that <Splitpanes> is composed of <Pane>, and verify that the panes are still in the right order,\\n    and if not update the internal order.\\n */\\n\\tfunction verifyAndUpdatePanesOrder() {\\n\\t\\tif (!container) {\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\t\\tconst { children } = container;\\n\\t\\tlet currentPaneIndex = 0;\\n\\t\\tlet needReorder = false;\\n\\t\\tfor (let i = 0; i < children.length; i++) {\\n\\t\\t\\tconst child = children.item(i);\\n\\t\\t\\tconst isPane = child.classList.contains('splitpanes__pane');\\n\\t\\t\\tconst isSplitter = child.classList.contains('splitpanes__splitter');\\n\\t\\t\\t// Node is not a Pane or a splitter: remove it.\\n\\t\\t\\tif (!isPane && !isSplitter) {\\n\\t\\t\\t\\tchild.parentNode?.removeChild(child); // el.remove() doesn't work on IE11.\\n\\t\\t\\t\\tconsole.warn(\\n\\t\\t\\t\\t\\t'Splitpanes: Only <Pane> elements are allowed at the root of <Splitpanes>. One of your DOM nodes was removed.'\\n\\t\\t\\t\\t);\\n\\t\\t\\t\\treturn;\\n\\t\\t\\t} else if (isPane) {\\n\\t\\t\\t\\tif (!needReorder && panes[currentPaneIndex].element !== child) {\\n\\t\\t\\t\\t\\tneedReorder = true;\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\tcurrentPaneIndex++;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tif (needReorder) {\\n\\t\\t\\tconst newPanes = [];\\n\\t\\t\\tfor (let i = 0; i < children.length; i++) {\\n\\t\\t\\t\\tconst child = children.item(i);\\n\\t\\t\\t\\tconst isPane = child?.classList.contains('splitpanes__pane');\\n\\t\\t\\t\\tif (isPane) {\\n\\t\\t\\t\\t\\tconst pane = panes.find((pane) => pane.element === child);\\n\\t\\t\\t\\t\\tif (pane != null) {\\n\\t\\t\\t\\t\\t\\tpane.index = newPanes.length;\\n\\t\\t\\t\\t\\t\\tnewPanes.push(pane);\\n\\t\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\t\\tconsole.warn(\\n\\t\\t\\t\\t\\t\\t\\t\\\"Splitpanes: Internal error - found a <Pane> elements which isn't tracked.\\\"\\n\\t\\t\\t\\t\\t\\t);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\tpanes = newPanes;\\n\\t\\t\\t$veryFirstPaneKey = panes.length > 0 ? panes[0].key : undefined;\\n\\t\\t}\\n\\t}\\n<\/script>\\n\\n<div\\n\\t{id}\\n\\tbind:this={container}\\n\\tclass={`splitpanes ${theme || ''} ${clazz || ''}`}\\n\\tclass:splitpanes--horizontal={horizontal}\\n\\tclass:splitpanes--vertical={!horizontal}\\n\\tclass:splitpanes--dragging={isMouseDown || isDragging}\\n\\tclass:splitpanes--freeze={!isAfterInitialTimeoutZero}\\n\\t{style}\\n>\\n\\t{#if !browser}\\n\\t\\t<GatheringRound><slot /></GatheringRound>\\n\\t{/if}\\n\\t<slot />\\n</div>\\n\\n<style global>\\n\\t:global(div.splitpanes--horizontal.splitpanes--dragging) {\\n\\t\\tcursor: row-resize;\\n\\t}\\n\\n\\t:global(div.splitpanes--vertical.splitpanes--dragging) {\\n\\t\\tcursor: col-resize;\\n\\t}\\n\\n\\t:global(.splitpanes) {\\n\\t\\tdisplay: flex;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}\\n\\t:global(.splitpanes--vertical) {\\n\\t\\tflex-direction: row;\\n\\t}\\n\\t:global(.splitpanes--horizontal) {\\n\\t\\tflex-direction: column;\\n\\t}\\n\\t:global(.splitpanes--dragging) :global(*) {\\n\\t\\tuser-select: none;\\n\\t}\\n\\t:global(.splitpanes__pane) {\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\toverflow: hidden;\\n\\t\\t/** Add also a direct child selector, for dealing with specifity of nested splitpanes transition.\\n      This issue was happening in the examples on nested splitpanes, vertical inside horizontal.\\n      I think it's better to keep also the previous CSS selector for (potential) old browser compatibility.\\n    */\\n\\t}\\n\\t:global(.splitpanes--vertical) :global(.splitpanes__pane) {\\n\\t\\ttransition: width 0.2s ease-out;\\n\\t}\\n\\t:global(.splitpanes--horizontal) :global(.splitpanes__pane) {\\n\\t\\ttransition: height 0.2s ease-out;\\n\\t}\\n\\t:global(.splitpanes--vertical) > :global(.splitpanes__pane) {\\n\\t\\ttransition: width 0.2s ease-out;\\n\\t}\\n\\t:global(.splitpanes--horizontal) > :global(.splitpanes__pane) {\\n\\t\\ttransition: height 0.2s ease-out;\\n\\t}\\n\\t:global(.splitpanes--dragging) :global(.splitpanes__pane) {\\n\\t\\ttransition: none;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\t:global(.splitpanes--freeze) :global(.splitpanes__pane) {\\n\\t\\ttransition: none;\\n\\t}\\n\\t:global(.splitpanes__splitter) {\\n\\t\\ttouch-action: none;\\n\\t}\\n\\t:global(.splitpanes--vertical) > :global(.splitpanes__splitter) {\\n\\t\\tmin-width: 1px;\\n\\t}\\n\\t:global(.splitpanes--horizontal) > :global(.splitpanes__splitter) {\\n\\t\\tmin-height: 1px;\\n\\t}\\n\\n\\t:global(.splitpanes.default-theme) :global(.splitpanes__pane) {\\n\\t\\tbackground-color: #f2f2f2;\\n\\t}\\n\\t:global(.splitpanes.default-theme) :global(.splitpanes__splitter) {\\n\\t\\tbackground-color: #fff;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tposition: relative;\\n\\t\\tflex-shrink: 0;\\n\\t}\\n\\t:global(.splitpanes.default-theme) :global(.splitpanes__splitter:before),\\n\\t:global(.splitpanes.default-theme) :global(.splitpanes__splitter:after) {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\ttop: 50%;\\n\\t\\tleft: 50%;\\n\\t\\tbackground-color: rgba(0, 0, 0, 0.15);\\n\\t\\ttransition: background-color 0.3s;\\n\\t}\\n\\t:global(.splitpanes.default-theme) :global(.splitpanes__splitter:hover:before),\\n\\t:global(.splitpanes.default-theme) :global(.splitpanes__splitter:hover:after) {\\n\\t\\tbackground-color: rgba(0, 0, 0, 0.25);\\n\\t}\\n\\t:global(.splitpanes.default-theme) :global(.splitpanes__splitter:first-child) {\\n\\t\\tcursor: auto;\\n\\t}\\n\\n\\t:global(.default-theme.splitpanes) :global(.splitpanes) :global(.splitpanes__splitter) {\\n\\t\\tz-index: 1;\\n\\t}\\n\\t:global(.default-theme.splitpanes--vertical) > :global(.splitpanes__splitter),\\n\\t:global(.default-theme) :global(.splitpanes--vertical) > :global(.splitpanes__splitter) {\\n\\t\\twidth: 7px;\\n\\t\\tborder-left: 1px solid #eee;\\n\\t\\tcursor: col-resize;\\n\\t}\\n\\t:global(.default-theme.splitpanes--vertical) > :global(.splitpanes__splitter:before),\\n\\t:global(.default-theme.splitpanes--vertical) > :global(.splitpanes__splitter:after),\\n\\t:global(.default-theme) :global(.splitpanes--vertical) > :global(.splitpanes__splitter:before),\\n\\t:global(.default-theme) :global(.splitpanes--vertical) > :global(.splitpanes__splitter:after) {\\n\\t\\ttransform: translateY(-50%);\\n\\t\\twidth: 1px;\\n\\t\\theight: 30px;\\n\\t}\\n\\t:global(.default-theme.splitpanes--vertical) > :global(.splitpanes__splitter:before),\\n\\t:global(.default-theme) :global(.splitpanes--vertical) > :global(.splitpanes__splitter:before) {\\n\\t\\tmargin-left: -2px;\\n\\t}\\n\\t:global(.default-theme.splitpanes--vertical) > :global(.splitpanes__splitter:after),\\n\\t:global(.default-theme) :global(.splitpanes--vertical) > :global(.splitpanes__splitter:after) {\\n\\t\\tmargin-left: 1px;\\n\\t}\\n\\t:global(.default-theme.splitpanes--horizontal) > :global(.splitpanes__splitter),\\n\\t:global(.default-theme) :global(.splitpanes--horizontal) > :global(.splitpanes__splitter) {\\n\\t\\theight: 7px;\\n\\t\\tborder-top: 1px solid #eee;\\n\\t\\tcursor: row-resize;\\n\\t}\\n\\t:global(.default-theme.splitpanes--horizontal) > :global(.splitpanes__splitter:before),\\n\\t:global(.default-theme.splitpanes--horizontal) > :global(.splitpanes__splitter:after),\\n\\t:global(.default-theme) :global(.splitpanes--horizontal) > :global(.splitpanes__splitter:before),\\n\\t:global(.default-theme) :global(.splitpanes--horizontal) > :global(.splitpanes__splitter:after) {\\n\\t\\ttransform: translateX(-50%);\\n\\t\\twidth: 30px;\\n\\t\\theight: 1px;\\n\\t}\\n\\t:global(.default-theme.splitpanes--horizontal) > :global(.splitpanes__splitter:before),\\n\\t:global(.default-theme) :global(.splitpanes--horizontal) > :global(.splitpanes__splitter:before) {\\n\\t\\tmargin-top: -2px;\\n\\t}\\n\\t:global(.default-theme.splitpanes--horizontal) > :global(.splitpanes__splitter:after),\\n\\t:global(.default-theme) :global(.splitpanes--horizontal) > :global(.splitpanes__splitter:after) {\\n\\t\\tmargin-top: 1px;\\n\\t}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAqzBS,+CAAiD,CACxD,MAAM,CAAE,UACT,CAEQ,6CAA+C,CACtD,MAAM,CAAE,UACT,CAEQ,WAAa,CACpB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACT,CACQ,qBAAuB,CAC9B,cAAc,CAAE,GACjB,CACQ,uBAAyB,CAChC,cAAc,CAAE,MACjB,CACQ,qBAAsB,CAAS,CAAG,CACzC,WAAW,CAAE,IACd,CACQ,iBAAmB,CAC1B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAKX,CACQ,qBAAsB,CAAS,iBAAmB,CACzD,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,QACxB,CACQ,uBAAwB,CAAS,iBAAmB,CAC3D,UAAU,CAAE,MAAM,CAAC,IAAI,CAAC,QACzB,CACQ,qBAAsB,CAAW,iBAAmB,CAC3D,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,QACxB,CACQ,uBAAwB,CAAW,iBAAmB,CAC7D,UAAU,CAAE,MAAM,CAAC,IAAI,CAAC,QACzB,CACQ,qBAAsB,CAAS,iBAAmB,CACzD,UAAU,CAAE,IAAI,CAChB,cAAc,CAAE,IACjB,CACQ,mBAAoB,CAAS,iBAAmB,CACvD,UAAU,CAAE,IACb,CACQ,qBAAuB,CAC9B,YAAY,CAAE,IACf,CACQ,qBAAsB,CAAW,qBAAuB,CAC/D,SAAS,CAAE,GACZ,CACQ,uBAAwB,CAAW,qBAAuB,CACjE,UAAU,CAAE,GACb,CAEQ,yBAA0B,CAAS,iBAAmB,CAC7D,gBAAgB,CAAE,OACnB,CACQ,yBAA0B,CAAS,qBAAuB,CACjE,gBAAgB,CAAE,IAAI,CACtB,UAAU,CAAE,UAAU,CACtB,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,CACd,CACQ,yBAA0B,CAAS,4BAA6B,CAChE,yBAA0B,CAAS,2BAA6B,CACvE,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACrC,UAAU,CAAE,gBAAgB,CAAC,IAC9B,CACQ,yBAA0B,CAAS,kCAAmC,CACtE,yBAA0B,CAAS,iCAAmC,CAC7E,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CACrC,CACQ,yBAA0B,CAAS,iCAAmC,CAC7E,MAAM,CAAE,IACT,CAEQ,yBAA0B,CAAS,WAAY,CAAS,qBAAuB,CACtF,OAAO,CAAE,CACV,CACQ,mCAAoC,CAAW,qBAAsB,CACrE,cAAe,CAAS,qBAAsB,CAAW,qBAAuB,CACvF,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC3B,MAAM,CAAE,UACT,CACQ,mCAAoC,CAAW,4BAA6B,CAC5E,mCAAoC,CAAW,2BAA4B,CAC3E,cAAe,CAAS,qBAAsB,CAAW,4BAA6B,CACtF,cAAe,CAAS,qBAAsB,CAAW,2BAA6B,CAC7F,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IACT,CACQ,mCAAoC,CAAW,4BAA6B,CAC5E,cAAe,CAAS,qBAAsB,CAAW,4BAA8B,CAC9F,WAAW,CAAE,IACd,CACQ,mCAAoC,CAAW,2BAA4B,CAC3E,cAAe,CAAS,qBAAsB,CAAW,2BAA6B,CAC7F,WAAW,CAAE,GACd,CACQ,qCAAsC,CAAW,qBAAsB,CACvE,cAAe,CAAS,uBAAwB,CAAW,qBAAuB,CACzF,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC1B,MAAM,CAAE,UACT,CACQ,qCAAsC,CAAW,4BAA6B,CAC9E,qCAAsC,CAAW,2BAA4B,CAC7E,cAAe,CAAS,uBAAwB,CAAW,4BAA6B,CACxF,cAAe,CAAS,uBAAwB,CAAW,2BAA6B,CAC/F,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GACT,CACQ,qCAAsC,CAAW,4BAA6B,CAC9E,cAAe,CAAS,uBAAwB,CAAW,4BAA8B,CAChG,UAAU,CAAE,IACb,CACQ,qCAAsC,CAAW,2BAA4B,CAC7E,cAAe,CAAS,uBAAwB,CAAW,2BAA6B,CAC/F,UAAU,CAAE,GACb\"}"
};
const KEY = {};
const thirdEventArg = (() => {
  let result = false;
  try {
    const arg = Object.defineProperty({}, "passive", {
      get() {
        result = { passive: true };
        return true;
      }
    });
    window.addEventListener("testpassive", arg, arg);
    window.remove("testpassive", arg, arg);
  } catch (_e) {
  }
  return result;
})();
const Splitpanes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $veryFirstPaneKey, $$unsubscribe_veryFirstPaneKey;
  let $showFirstSplitter, $$unsubscribe_showFirstSplitter;
  let $isHorizontal, $$unsubscribe_isHorizontal;
  let { id = void 0 } = $$props;
  let { horizontal = false } = $$props;
  let { pushOtherPanes = true } = $$props;
  let { dblClickSplitter = true } = $$props;
  let { rtl = "auto" } = $$props;
  let { firstSplitter = false } = $$props;
  let { style = null } = $$props;
  let { theme = "splitpanes-theme" } = $$props;
  let { class: clazz = "" } = $$props;
  const dispatch = createEventDispatcher();
  let container;
  let isReady = false;
  let isAwaitingPaneReset = false;
  let isMouseDown = false;
  let isDragging = false;
  let activeSplitter = -1;
  let clickedSplitter = -1;
  let timeoutId;
  let panes = new Array();
  const isHorizontal = writable(horizontal);
  $$unsubscribe_isHorizontal = subscribe(isHorizontal, (value) => $isHorizontal = value);
  const showFirstSplitter = writable(firstSplitter);
  $$unsubscribe_showFirstSplitter = subscribe(showFirstSplitter, (value) => $showFirstSplitter = value);
  const veryFirstPaneKey = writable(void 0);
  $$unsubscribe_veryFirstPaneKey = subscribe(veryFirstPaneKey, (value) => $veryFirstPaneKey = value);
  let activeSplitterElement;
  let activeSplitterDrag;
  let ssrPaneDefinedSizeSum = 0;
  let ssrPaneUndefinedSizeCount = 0;
  function ssrRegisterPaneSize(size) {
    if (size == null) {
      ++ssrPaneUndefinedSizeCount;
    } else {
      ssrPaneDefinedSizeSum += size;
    }
  }
  const onPaneInit = (_key) => {
    if ($veryFirstPaneKey === void 0) {
      set_store_value(veryFirstPaneKey, $veryFirstPaneKey = _key, $veryFirstPaneKey);
    }
    return {
      undefinedPaneInitSize: BROWSER ? 0 : (100 - ssrPaneDefinedSizeSum) / ssrPaneUndefinedSizeCount
    };
  };
  setContext(KEY, {
    showFirstSplitter,
    veryFirstPaneKey,
    isHorizontal,
    ssrRegisterPaneSize: BROWSER ? void 0 : ssrRegisterPaneSize,
    onPaneInit,
    clientOnly: BROWSER ? { onPaneAdd, onPaneRemove } : void 0
  });
  function onPaneAdd(pane) {
    let index = -1;
    if (pane.element.parentNode) {
      Array.from(pane.element.parentNode.children).some((el) => {
        if (el.className.includes("splitpanes__pane")) index++;
        return el === pane.element;
      });
    }
    if (index === 0) {
      set_store_value(veryFirstPaneKey, $veryFirstPaneKey = pane.key, $veryFirstPaneKey);
    }
    panes.splice(index, 0, pane);
    for (let i = 0; i < panes.length; i++) {
      panes[i].index = i;
    }
    if (isReady) {
      tickAndResetPaneSizes().then(() => {
        pane.isReady = true;
        dispatch("pane-add", { index, panes: prepareSizeEvent() });
      });
    }
    const paneForward = (cb, includingFirst = true) => (value) => {
      if (includingFirst || pane.index > 0) {
        cb(value, pane);
      }
    };
    return {
      onSplitterDown: paneForward(onMouseDown, false),
      onSplitterClick: paneForward(onSplitterClick, false),
      onSplitterDblClick: paneForward(onSplitterDblClick),
      onPaneClick: paneForward(onPaneClick),
      reportGivenSizeChange: paneForward(reportGivenSizeChange)
    };
  }
  async function onPaneRemove(key) {
    const index = panes.findIndex((p) => p.key === key);
    if (index >= 0) {
      const removed = panes.splice(index, 1)[0];
      for (let i = 0; i < panes.length; i++) {
        panes[i].index = i;
      }
      if (index === 0) {
        set_store_value(veryFirstPaneKey, $veryFirstPaneKey = panes.length > 0 ? panes[0].key : void 0, $veryFirstPaneKey);
      }
      if (isReady) {
        await tickAndResetPaneSizes();
        dispatch("pane-remove", { removed, panes: prepareSizeEvent() });
      }
    }
  }
  function onPaneClick(_event, pane) {
    dispatch("pane-click", pane);
  }
  function reportGivenSizeChange(newGivenSize, pane) {
    pane.setSz(newGivenSize);
    tickAndResetPaneSizes();
  }
  if (BROWSER) {
    onDestroy(() => {
      if (isReady) {
        unbindEvents();
      }
      isReady = false;
    });
  }
  function isRTL(containerComputedStyle) {
    if (rtl === "auto") {
      try {
        return (containerComputedStyle ?? calcComputedStyle(container)).direction === "rtl";
      } catch (_err) {
      }
    }
    return rtl === true;
  }
  function bindEvents() {
    document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
    document.addEventListener("mousemove", onMouseMove, thirdEventArg);
    document.addEventListener("mouseup", onMouseUp);
    if ("ontouchstart" in window) {
      document.addEventListener("touchmove", onMouseMove, thirdEventArg);
      document.addEventListener("touchend", onMouseUp);
    }
  }
  function unbindEvents() {
    document.body.style.cursor = "";
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    if ("ontouchstart" in window) {
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    }
  }
  const isSplitterElement = (node) => node.nodeType === Node.ELEMENT_NODE && node.classList.contains("splitpanes__splitter");
  function getOrientedDiff(drag, elementSize, isRTL2) {
    let tdrag = drag[horizontal ? "top" : "left"];
    if (isRTL2 && !horizontal) tdrag = elementSize - tdrag;
    return tdrag;
  }
  const getCurrentDimensionName = () => getDimensionName(horizontal);
  function onMouseDown(event, splitterPane) {
    isMouseDown = true;
    activeSplitter = splitterPane.index;
    splitterPane.setSplitterActive(true);
    const paneElement = splitterPane.element;
    let activeSplitterNode = paneElement;
    while (activeSplitterNode != null) {
      activeSplitterNode = activeSplitterNode.previousSibling;
      if (activeSplitterNode && isSplitterElement(activeSplitterNode)) {
        break;
      }
    }
    if (activeSplitterNode == null) {
      console.error("Splitpane Error: Active splitter wasn't found!");
      return;
    }
    activeSplitterElement = activeSplitterNode;
    const globalMousePosition = getGlobalMousePosition(event);
    const splitterRect = getElementRect(activeSplitterElement);
    activeSplitterDrag = getOrientedDiff(positionDiff(globalMousePosition, splitterRect), splitterRect[getCurrentDimensionName()], isRTL());
    bindEvents();
  }
  function onMouseMove(event) {
    if (isMouseDown) {
      isDragging = true;
      const globalMousePosition = getGlobalMousePosition(event);
      const containerComputedStyle = calcComputedStyle(container);
      const containerRectWithoutBorder = elementRectWithoutBorder(container, containerComputedStyle);
      const containerSizeWithoutBorder = containerRectWithoutBorder[getCurrentDimensionName()];
      const _isRTL = isRTL(containerComputedStyle);
      const currentMouseDrag = positionDiff(globalMousePosition, containerRectWithoutBorder);
      const tdrag = getOrientedDiff(currentMouseDrag, containerSizeWithoutBorder, _isRTL);
      calculatePanesSize(tdrag, containerSizeWithoutBorder);
      dispatch("resize", prepareSizeEvent());
    }
  }
  function onMouseUp() {
    if (isDragging) {
      dispatch("resized", prepareSizeEvent());
    }
    isMouseDown = false;
    const pane = panes[activeSplitter];
    pane.setSplitterActive(false);
    setTimeout(
      () => {
        isDragging = false;
        unbindEvents();
      },
      100
    );
  }
  function onSplitterClick(event, splitterPane) {
    if ("ontouchstart" in window) {
      const splitterIndex = splitterPane.index;
      if (dblClickSplitter) {
        if (clickedSplitter === splitterIndex) {
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = null;
          onSplitterDblClick(event, splitterPane);
          clickedSplitter = -1;
        } else {
          clickedSplitter = splitterIndex;
          timeoutId = setTimeout(
            () => {
              clickedSplitter = -1;
            },
            500
          );
        }
      }
    }
    if (!isDragging) dispatch("splitter-click", splitterPane);
  }
  function onSplitterDblClick(_event, splitterPane) {
    if (dblClickSplitter) {
      const splitterIndex = splitterPane.index;
      let totalMinSizes = 0;
      for (let i = 0; i < panes.length; i++) {
        const pane = panes[i];
        if (i !== splitterIndex) {
          totalMinSizes += pane.min();
        }
      }
      const maxExtendedSize = Math.min(Math.max(0, 100 - totalMinSizes), splitterPane.max());
      const totalMaxExtendedPlusMinSizes = totalMinSizes + maxExtendedSize;
      if (totalMaxExtendedPlusMinSizes >= 100) {
        for (let i = 0; i < panes.length; i++) {
          const pane = panes[i];
          if (pane !== splitterPane) {
            pane.setSz(pane.min());
          } else {
            pane.setSz(100 - totalMinSizes);
          }
        }
      } else {
        let leftSpare = 100 - totalMaxExtendedPlusMinSizes;
        splitterPane.setSz(maxExtendedSize);
        const giveBest = (pane) => {
          const min = pane.min();
          const max = pane.max();
          const szExtra = Math.min(Math.max(0, leftSpare), max - min);
          pane.setSz(min + szExtra);
          leftSpare -= szExtra;
        };
        for (let i = splitterIndex - 1; i >= 0; i--) giveBest(panes[i]);
        for (let i = splitterIndex + 1; i < panes.length; i++) giveBest(panes[i]);
        if (leftSpare != 0) {
          console.warn("Splitpanes: there is a left spare size after computation of splitter double click, which means there are issues on the size constains of the panes.");
        }
      }
      dispatch("pane-maximize", splitterPane);
      dispatch("resized", prepareSizeEvent());
    }
    isMouseDown = false;
  }
  const prepareSizeEvent = () => panes.map((pane) => ({
    min: pane.min(),
    max: pane.max(),
    size: pane.sz(),
    snap: pane.snap()
  }));
  function getCurrentDragPercentage(tdrag, containerSizeWithoutBorder) {
    const splitterSize = (node) => getElementRect(node)[getCurrentDimensionName()];
    const activeSplitterSize = splitterSize(activeSplitterElement);
    let splittersTotalSizeBefore = 0;
    let currentBeforeNode = activeSplitterElement.previousSibling;
    while (currentBeforeNode != null) {
      if (isSplitterElement(currentBeforeNode)) {
        splittersTotalSizeBefore += splitterSize(currentBeforeNode);
      }
      currentBeforeNode = currentBeforeNode.previousSibling;
    }
    let splittersTotalSizeAfter = 0;
    let currentAfterNode = activeSplitterElement.nextSibling;
    while (currentAfterNode != null) {
      if (isSplitterElement(currentAfterNode)) {
        splittersTotalSizeAfter += splitterSize(currentAfterNode);
      }
      currentAfterNode = currentAfterNode.nextSibling;
    }
    const totalSplitterBefore = splittersTotalSizeBefore + activeSplitterDrag;
    const totalSplitter = splittersTotalSizeBefore + activeSplitterSize + splittersTotalSizeAfter;
    return (tdrag - totalSplitterBefore) / (containerSizeWithoutBorder - totalSplitter) * 100;
  }
  function calculatePanesSize(tdrag, containerSizeWithoutBorder) {
    let paneBeforeIndex = activeSplitter - 1;
    let paneBefore = panes[paneBeforeIndex];
    let paneAfterIndex = activeSplitter;
    let paneAfter = panes[paneAfterIndex];
    let sums = {
      prevPanesSize: sumPrevPanesSize(paneBeforeIndex),
      nextPanesSize: sumNextPanesSize(paneAfterIndex),
      prevReachedMinPanes: 0,
      nextReachedMinPanes: 0
    };
    const minDrag = 0 + (pushOtherPanes ? 0 : sums.prevPanesSize);
    const maxDrag = 100 - (pushOtherPanes ? 0 : sums.nextPanesSize);
    const mouseDragPercentage = Math.max(Math.min(getCurrentDragPercentage(tdrag, containerSizeWithoutBorder), maxDrag), minDrag);
    const paneBeforeSnap = sums.prevPanesSize + paneBefore.min() + paneBefore.snap();
    const paneAfterSnap = 100 - (sums.nextPanesSize + paneAfter.min() + paneAfter.snap());
    let dragPercentage = mouseDragPercentage;
    let snapped = false;
    if (mouseDragPercentage <= paneBeforeSnap) {
      if (mouseDragPercentage > sums.prevPanesSize + paneBefore.min()) {
        dragPercentage = Math.max(paneBefore.min() + sums.prevPanesSize, 100 - (paneAfter.max() + sums.nextPanesSize));
        snapped = true;
      }
    } else if (mouseDragPercentage >= paneAfterSnap) {
      if (mouseDragPercentage < 100 - sums.nextPanesSize - paneAfter.min()) {
        dragPercentage = Math.min(100 - (paneAfter.min() + sums.nextPanesSize), paneBefore.max() + sums.prevPanesSize);
        snapped = true;
      }
    }
    const paneBeforeMaxReached = paneBefore.max() < 100 && dragPercentage >= paneBefore.max() + sums.prevPanesSize;
    const paneAfterMaxReached = paneAfter.max() < 100 && dragPercentage <= 100 - (paneAfter.max() + sums.nextPanesSize);
    if (paneBeforeMaxReached || paneAfterMaxReached) {
      if (paneBeforeMaxReached) {
        paneBefore.setSz(paneBefore.max());
        paneAfter.setSz(Math.max(100 - paneBefore.max() - sums.prevPanesSize - sums.nextPanesSize, 0));
      } else {
        paneBefore.setSz(Math.max(100 - paneAfter.max() - sums.prevPanesSize - sums.nextPanesSize, 0));
        paneAfter.setSz(paneAfter.max());
      }
    } else {
      if (pushOtherPanes && !snapped) {
        const vars = doPushOtherPanes(sums, dragPercentage);
        if (!vars) {
          return;
        }
        ({ sums, paneBeforeIndex, paneAfterIndex } = vars);
        paneBefore = panes[paneBeforeIndex];
        paneAfter = panes[paneAfterIndex];
      }
      if (paneBeforeIndex != null) {
        paneBefore.setSz(Math.min(Math.max(dragPercentage - sums.prevPanesSize - sums.prevReachedMinPanes, paneBefore.min()), paneBefore.max()));
      }
      if (paneAfterIndex != null) {
        paneAfter.setSz(Math.min(Math.max(100 - dragPercentage - sums.nextPanesSize - sums.nextReachedMinPanes, paneAfter.min()), paneAfter.max()));
      }
    }
  }
  function doPushOtherPanes(sums, dragPercentage) {
    const splitterIndex = activeSplitter - 1;
    let paneBeforeIndex = splitterIndex;
    let paneAfterIndex = splitterIndex + 1;
    if (dragPercentage < sums.prevPanesSize + panes[paneBeforeIndex].min()) {
      paneBeforeIndex = findPrevExpandedPane(splitterIndex)?.index || 0;
      sums.prevReachedMinPanes = 0;
      if (paneBeforeIndex < splitterIndex) {
        forEachPartial(panes, paneBeforeIndex + 1, splitterIndex + 1, (pane) => {
          pane.setSz(pane.min());
          sums.prevReachedMinPanes += pane.min();
        });
      }
      sums.prevPanesSize = sumPrevPanesSize(paneBeforeIndex);
      if (paneBeforeIndex == null) {
        sums.prevReachedMinPanes = 0;
        panes[0].setSz(panes[0].min());
        forEachPartial(panes, 1, splitterIndex + 1, (pane) => {
          pane.setSz(pane.min());
          sums.prevReachedMinPanes += pane.min();
        });
        panes[paneAfterIndex].setSz(100 - sums.prevReachedMinPanes - panes[0].min() - sums.prevPanesSize - sums.nextPanesSize);
        return null;
      }
    }
    if (dragPercentage > 100 - sums.nextPanesSize - panes[paneAfterIndex].min()) {
      paneAfterIndex = findNextExpandedPane(splitterIndex)?.index || 0;
      sums.nextReachedMinPanes = 0;
      if (paneAfterIndex > splitterIndex + 1) {
        forEachPartial(panes, splitterIndex + 1, paneAfterIndex, (pane) => {
          pane.setSz(pane.min());
          sums.nextReachedMinPanes += pane.min();
        });
      }
      sums.nextPanesSize = sumNextPanesSize(paneAfterIndex);
      const panesCount = panes.length;
      if (paneAfterIndex == null) {
        sums.nextReachedMinPanes = 0;
        panes[panesCount - 1].setSz(panes[panesCount - 1].min());
        forEachPartial(panes, splitterIndex + 1, panesCount - 1, (pane) => {
          pane.setSz(pane.min());
          sums.nextReachedMinPanes += pane.min();
        });
        panes[paneBeforeIndex].setSz(100 - sums.prevPanesSize - sums.nextReachedMinPanes - panes[panesCount - 1].min() - sums.nextPanesSize);
        return null;
      }
    }
    return { sums, paneBeforeIndex, paneAfterIndex };
  }
  const getSizeOfPane = (pane) => pane.sz();
  const sumPrevPanesSize = (splitterIndex) => sumPartial(panes, 0, splitterIndex, getSizeOfPane);
  const sumNextPanesSize = (splitterIndex) => sumPartial(panes, splitterIndex + 1, panes.length, getSizeOfPane);
  const findPrevExpandedPane = (splitterIndex) => [...panes].reverse().find((p) => p.index < splitterIndex && p.sz() > p.min());
  const findNextExpandedPane = (splitterIndex) => panes.find((p) => p.index > splitterIndex + 1 && p.sz() > p.min());
  async function tickAndResetPaneSizes() {
    isAwaitingPaneReset = true;
    await tick();
    if (isAwaitingPaneReset) {
      resetPaneSizes();
      isAwaitingPaneReset = false;
    }
  }
  function resetPaneSizes() {
    equalize();
    if (isReady) dispatch("resized", prepareSizeEvent());
  }
  function equalize() {
    if (panes.length === 0) {
      return;
    }
    const panesCount = panes.length;
    let leftToAllocate = 100;
    let definedSizesCount = 0;
    let undefinedSizesNotReadyCount = 0;
    let undefinedSizesSum = 0;
    const ungrowable = [];
    const unshrinkable = [];
    for (let i = 0; i < panesCount; i++) {
      const pane = panes[i];
      const sz = pane.sz();
      if (pane.givenSize == null) {
        if (pane.isReady) {
          undefinedSizesSum += sz;
          if (sz >= pane.max()) ungrowable.push(pane);
          if (sz <= pane.min()) unshrinkable.push(pane);
        } else {
          undefinedSizesNotReadyCount += 1;
        }
      } else {
        leftToAllocate -= sz;
        definedSizesCount++;
        ungrowable.push(pane);
        unshrinkable.push(pane);
      }
    }
    const undefinedSizesCount = panesCount - definedSizesCount;
    const undefinedSizesReadyCount = undefinedSizesCount - undefinedSizesNotReadyCount;
    let undefinedSizesNotReadySz;
    let undefinedScaleFactor;
    if (undefinedSizesReadyCount > 0) {
      undefinedSizesNotReadySz = undefinedSizesSum / undefinedSizesReadyCount;
      if (undefinedSizesNotReadySz > 0.1 && leftToAllocate > 0.1) {
        undefinedSizesSum += undefinedSizesNotReadyCount * undefinedSizesNotReadySz;
        undefinedScaleFactor = leftToAllocate / undefinedSizesSum;
      } else {
        undefinedSizesNotReadySz = 0;
        undefinedScaleFactor = 1;
      }
    } else {
      undefinedSizesNotReadySz = leftToAllocate / undefinedSizesCount;
      undefinedScaleFactor = 1;
    }
    if (leftToAllocate + undefinedSizesSum > 0.1) {
      leftToAllocate = 100;
      for (let i = 0; i < panesCount; i++) {
        const pane = panes[i];
        if (pane.givenSize == null) {
          const currentSz = pane.isReady ? pane.sz() : undefinedSizesNotReadySz;
          const sz = Math.max(Math.min(currentSz * undefinedScaleFactor, pane.max()), pane.min());
          pane.setSz(sz);
        }
        leftToAllocate -= pane.sz();
      }
      if (Math.abs(leftToAllocate) > 0.1) {
        leftToAllocate = readjustSizes(leftToAllocate, ungrowable, unshrinkable);
      }
    }
    if (!isFinite(leftToAllocate)) {
      console.warn("Splitpanes: Internal error, sizes might be NaN as a result.");
    } else if (Math.abs(leftToAllocate) > 0.1) {
      console.warn("Splitpanes: Could not resize panes correctly due to their constraints.");
    }
  }
  function readjustSizes(leftToAllocate, ungrowable, unshrinkable) {
    const panesCount = panes.length;
    const panesSizableCount = panesCount - (leftToAllocate > 0 ? ungrowable.length : unshrinkable.length);
    if (panesSizableCount <= 0) {
      return leftToAllocate;
    }
    const equalSpaceToAllocate = leftToAllocate / panesSizableCount;
    if (panes.length === 1) {
      panes[0].setSz(100);
      leftToAllocate = 0;
    } else for (let i = 0; i < panes.length; i++) {
      const pane = panes[i];
      const sz = pane.sz();
      if (leftToAllocate > 0 && !ungrowable.includes(pane)) {
        const newPaneSize = Math.max(Math.min(sz + equalSpaceToAllocate, pane.max()), pane.min());
        const allocated = newPaneSize - sz;
        leftToAllocate -= allocated;
        pane.setSz(newPaneSize);
      } else if (!unshrinkable.includes(pane)) {
        const newPaneSize = Math.max(Math.min(sz + equalSpaceToAllocate, pane.max()), pane.min());
        const allocated = newPaneSize - sz;
        leftToAllocate -= allocated;
        pane.setSz(newPaneSize);
      }
    }
    return leftToAllocate;
  }
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0) $$bindings.horizontal(horizontal);
  if ($$props.pushOtherPanes === void 0 && $$bindings.pushOtherPanes && pushOtherPanes !== void 0) $$bindings.pushOtherPanes(pushOtherPanes);
  if ($$props.dblClickSplitter === void 0 && $$bindings.dblClickSplitter && dblClickSplitter !== void 0) $$bindings.dblClickSplitter(dblClickSplitter);
  if ($$props.rtl === void 0 && $$bindings.rtl && rtl !== void 0) $$bindings.rtl(rtl);
  if ($$props.firstSplitter === void 0 && $$bindings.firstSplitter && firstSplitter !== void 0) $$bindings.firstSplitter(firstSplitter);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0) $$bindings.class(clazz);
  $$result.css.add(css$5);
  set_store_value(isHorizontal, $isHorizontal = horizontal, $isHorizontal);
  set_store_value(showFirstSplitter, $showFirstSplitter = firstSplitter, $showFirstSplitter);
  $$unsubscribe_veryFirstPaneKey();
  $$unsubscribe_showFirstSplitter();
  $$unsubscribe_isHorizontal();
  return `<div${add_attribute("id", id, 0)} class="${[
    escape(`splitpanes ${theme || ""} ${clazz || ""}`, true),
    (horizontal ? "splitpanes--horizontal" : "") + " " + (!horizontal ? "splitpanes--vertical" : "") + " " + (isMouseDown || isDragging ? "splitpanes--dragging" : "") + " splitpanes--freeze"
  ].join(" ").trim()}"${add_attribute("style", style, 0)}${add_attribute("this", container, 0)}>${!BROWSER ? `${validate_component(GatheringRound, "GatheringRound").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}` : ``} ${slots.default ? slots.default({}) : ``} </div>`;
});
const carefullCallbackGenerator = (callbackObjectGetter, callbackName) => (value) => {
  const callbackObject = callbackObjectGetter();
  if (callbackObject !== null) {
    callbackObject[callbackName](value);
  }
};
const carefullCallbackSource = (callbackObjectGetter) => (
  //@ts-expect-error unassignable
  carefullCallbackGenerator.bind(null, callbackObjectGetter)
);
const Pane = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dimension;
  let style;
  let $isHorizontal, $$unsubscribe_isHorizontal;
  let $veryFirstPaneKey, $$unsubscribe_veryFirstPaneKey;
  let $showFirstSplitter, $$unsubscribe_showFirstSplitter;
  const { ssrRegisterPaneSize, onPaneInit, clientOnly: clientOnlyContext, isHorizontal, showFirstSplitter, veryFirstPaneKey } = getContext(KEY);
  $$unsubscribe_isHorizontal = subscribe(isHorizontal, (value) => $isHorizontal = value);
  $$unsubscribe_showFirstSplitter = subscribe(showFirstSplitter, (value) => $showFirstSplitter = value);
  $$unsubscribe_veryFirstPaneKey = subscribe(veryFirstPaneKey, (value) => $veryFirstPaneKey = value);
  let { size = null } = $$props;
  let { minSize = 0 } = $$props;
  let { maxSize = 100 } = $$props;
  let { snapSize = 0 } = $$props;
  let { class: clazz = "" } = $$props;
  const key = {};
  const gathering = !BROWSER && hasContext(gatheringKey);
  const { undefinedPaneInitSize } = !gathering ? onPaneInit(key) : {};
  let element;
  let sz = size ?? undefinedPaneInitSize;
  let clientCallbacks = void 0;
  const carefullClientCallbacks = BROWSER ? carefullCallbackSource(() => clientCallbacks) : carefullCallbackSource(() => clientCallbacks);
  const reportGivenSizeChangeSafe = (size2) => {
    if (size2 != sz) {
      carefullClientCallbacks("reportGivenSizeChange")(size2);
    }
  };
  if (gathering && ssrRegisterPaneSize) {
    ssrRegisterPaneSize(size);
  } else if (BROWSER) {
    onDestroy(() => {
      clientOnlyContext?.onPaneRemove(key);
    });
  }
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.minSize === void 0 && $$bindings.minSize && minSize !== void 0) $$bindings.minSize(minSize);
  if ($$props.maxSize === void 0 && $$bindings.maxSize && maxSize !== void 0) $$bindings.maxSize(maxSize);
  if ($$props.snapSize === void 0 && $$bindings.snapSize && snapSize !== void 0) $$bindings.snapSize(snapSize);
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0) $$bindings.class(clazz);
  {
    {
      if (BROWSER && size != null) {
        reportGivenSizeChangeSafe(size);
      }
    }
  }
  dimension = getDimensionName($isHorizontal);
  style = `${dimension}: ${sz}%;`;
  $$unsubscribe_isHorizontal();
  $$unsubscribe_veryFirstPaneKey();
  $$unsubscribe_showFirstSplitter();
  return `${!gathering ? ` ${$veryFirstPaneKey !== key || $showFirstSplitter ? `   <div class="${"splitpanes__splitter " + escape("", true)}"></div>` : ``}     <div${add_attribute("class", `splitpanes__pane ${clazz || ""}`, 0)}${add_attribute("style", style, 0)}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</div>` : ``}`;
});
const HeaderEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { headers } = $$props;
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0) $$bindings.headers(headers);
  return `${headers !== void 0 ? ` ${validate_component(DataTable, "DataTable").$$render(
    $$result,
    {
      headers: [{ key: "name", value: "Name" }, { key: "value", value: "Value" }],
      rows: headers.get_array(),
      size: "short"
    },
    {},
    {}
  )} ` : ``}`;
});
const css$4 = {
  code: ".codemirror.svelte-1xi9xc4{display:contents}",
  map: `{"version":3,"file":"CodeMirror.svelte","sources":["CodeMirror.svelte"],"sourcesContent":["<!-- The code below is released under public domain. -->\\n\\n<script context=\\"module\\">\\nimport { EditorView, minimalSetup, basicSetup } from 'codemirror'\\nimport { ViewPlugin } from '@codemirror/view'\\nimport { StateEffect } from '@codemirror/state'\\nexport { minimalSetup, basicSetup }\\n<\/script>\\n\\n<script>\\nimport { onMount, onDestroy, createEventDispatcher } from 'svelte'\\nconst dispatch = createEventDispatcher()\\n\\nlet dom\\n\\nlet _mounted = false\\nonMount(() => {\\n  _mounted = true\\n  return () => { _mounted = false }\\n})\\n\\nexport let view = null\\n\\n/* \`doc\` is deliberately made non-reactive for not storing a reduntant string\\n   besides the editor. Also, setting doc to undefined will not trigger an\\n   update, so that you can clear it after setting one. */\\nexport let doc\\n\\n/* Set this if you would like to listen to all transactions via \`update\` event. */\\nexport let verbose = false\\n\\n/* Cached doc string so that we don't extract strings in bulk over and over. */\\nlet _docCached = null\\n\\n/* Overwrite the bulk of the text with the one specified. */\\nfunction _setText(text) {\\n  view.dispatch({\\n    changes: {from: 0, to: view.state.doc.length, insert: text},\\n  })\\n}\\n\\nconst subscribers = new Set()\\n\\n/* And here comes the reactivity, implemented as a r/w store. */\\nexport const docStore = {\\n  ready: () => (view !== null),\\n  subscribe(cb) {\\n    subscribers.add(cb)\\n\\n    if (!this.ready()) {\\n      cb(null)\\n    } else {\\n      if (_docCached == null) {\\n        _docCached = view.state.doc.toString()\\n      }\\n      cb(_docCached)\\n    }\\n\\n    return () => void subscribers.delete(cb)\\n  },\\n  set(newValue) {\\n    if (!_mounted) {\\n      throw new Error('Cannot set docStore when the component is not mounted.')\\n    }\\n\\n    const inited = _initEditorView(newValue)\\n    if (!inited) _setText(newValue)\\n  },\\n}\\n\\nexport let extensions = minimalSetup\\n\\nfunction _reconfigureExtensions() {\\n  if (view === null) return\\n  view.dispatch({\\n    effects: StateEffect.reconfigure.of(extensions),\\n  })\\n}\\n\\n$: extensions, _reconfigureExtensions()\\n\\nfunction _editorTxHandler(trs, view) {\\n  view.update(trs)\\n\\n  if (verbose) {\\n    dispatch('update', trs)\\n  }\\n\\n\\tlet lastChangingTr\\n  if (lastChangingTr = trs.findLast(tr => tr.docChanged)) {\\n    _docCached = null\\n    if (subscribers.size) {\\n      dispatchDocStore(_docCached = lastChangingTr.newDoc.toString())\\n    }\\n    dispatch('change', {view, trs})\\n  }\\n}\\n\\nfunction dispatchDocStore(s) {\\n  for (const cb of subscribers) {\\n    cb(s)\\n  }\\n}\\n\\n// the view will be inited with the either doc (as long as that it is not \`undefined\`)\\n// or the value in docStore once set\\nfunction _initEditorView(initialDoc) {\\n  if (view !== null) {\\n    return false\\n  }\\n\\n  view = new EditorView({\\n    doc: initialDoc,\\n    extensions,\\n    parent: dom,\\n    dispatchTransactions: _editorTxHandler,\\n  })\\n  return true\\n}\\n\\n$: if (_mounted && doc !== undefined) {\\n  const inited = _initEditorView(doc)\\n  dispatchDocStore(doc)\\n}\\n\\nonDestroy(() => {\\n  if (view !== null) {\\n    view.destroy()\\n  }\\n})\\n<\/script>\\n\\n<div class=\\"codemirror\\" bind:this={dom}>\\n</div>\\n\\n<style>\\n.codemirror {\\n  display: contents;\\n}\\n</style>\\n"],"names":[],"mappings":"AAwIA,0BAAY,CACV,OAAO,CAAE,QACX"}`
};
const CodeMirror = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let dom;
  let { view = null } = $$props;
  let { doc } = $$props;
  let { verbose = false } = $$props;
  let _docCached = null;
  const subscribers = /* @__PURE__ */ new Set();
  const docStore = {
    ready: () => view !== null,
    subscribe(cb) {
      subscribers.add(cb);
      if (!this.ready()) {
        cb(null);
      } else {
        if (_docCached == null) {
          _docCached = view.state.doc.toString();
        }
        cb(_docCached);
      }
      return () => void subscribers.delete(cb);
    },
    set(newValue) {
      {
        throw new Error("Cannot set docStore when the component is not mounted.");
      }
    }
  };
  let { extensions = minimalSetup } = $$props;
  function _reconfigureExtensions() {
    if (view === null) return;
    view.dispatch({
      effects: StateEffect.reconfigure.of(extensions)
    });
  }
  onDestroy(() => {
    if (view !== null) {
      view.destroy();
    }
  });
  if ($$props.view === void 0 && $$bindings.view && view !== void 0) $$bindings.view(view);
  if ($$props.doc === void 0 && $$bindings.doc && doc !== void 0) $$bindings.doc(doc);
  if ($$props.verbose === void 0 && $$bindings.verbose && verbose !== void 0) $$bindings.verbose(verbose);
  if ($$props.docStore === void 0 && $$bindings.docStore && docStore !== void 0) $$bindings.docStore(docStore);
  if ($$props.extensions === void 0 && $$bindings.extensions && extensions !== void 0) $$bindings.extensions(extensions);
  $$result.css.add(css$4);
  {
    _reconfigureExtensions();
  }
  return `   <div class="codemirror svelte-1xi9xc4"${add_attribute("this", dom, 0)} data-svelte-h="svelte-193vmah"></div>`;
});
const CodeEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { code = "" } = $$props;
  let { lang = void 0 } = $$props;
  let { readonly = false } = $$props;
  let extensions = [basicSetup, barf, EditorState.readOnly.of(readonly)];
  if ($$props.code === void 0 && $$bindings.code && code !== void 0) $$bindings.code(code);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0) $$bindings.lang(lang);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  return `  ${validate_component(CodeMirror, "CodeMirror").$$render($$result, { doc: code, extensions }, {}, {})}`;
});
const BodyEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { body } = $$props;
  let { content_extension = void 0 } = $$props;
  let { readonly = false } = $$props;
  let { charset } = $$props;
  let content;
  if ($$props.body === void 0 && $$bindings.body && body !== void 0) $$bindings.body(body);
  if ($$props.content_extension === void 0 && $$bindings.content_extension && content_extension !== void 0) $$bindings.content_extension(content_extension);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  if ($$props.charset === void 0 && $$bindings.charset && charset !== void 0) $$bindings.charset(charset);
  return `${validate_component(CodeEditor, "CodeEditor").$$render(
    $$result,
    {
      code: content,
      lang: content_extension,
      readonly
    },
    {},
    {}
  )}`;
});
const css$3 = {
  code: ".top.svelte-dlqxe9{display:grid;grid-template-columns:33% 33% 34%}.root.svelte-dlqxe9{overflow:scroll}",
  map: `{"version":3,"file":"RequestEditor.svelte","sources":["RequestEditor.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { Request } from \\"$lib/request\\";\\nimport { ComboBox, Select, SelectItem, TextInput } from \\"carbon-components-svelte\\";\\nimport HeaderEditor from \\"./HeaderEditor.svelte\\";\\nimport BodyEditor from \\"./BodyEditor.svelte\\";\\nimport { charset_options } from \\"$lib/body\\";\\nexport let request;\\nexport let readonly = false;\\nlet headers = request.get_headers();\\nlet version = request.get_version();\\nlet method = request.get_method();\\nlet uri = request.get_uri();\\nlet body = request.get_body();\\nlet content_extension = headers.content_extension();\\nlet selected_charset_id = \\"0\\";\\n<\/script>\\n\\n{#if request !== undefined}\\n\\t<div class=\\"root\\">\\n\\t\\t<div class=\\"top\\">\\n\\t\\t\\t<TextInput readonly hideLabel size=\\"sm\\" value={version} />\\n\\t\\t\\t<ComboBox size=\\"sm\\" selectedId=\\"0\\" items={[{ id: '0', text: method }]} />\\n\\t\\t\\t<ComboBox size=\\"sm\\" bind:selectedId={selected_charset_id} items={charset_options} />\\n\\t\\t</div>\\n\\t\\t<TextInput hideLabel value={uri} size=\\"sm\\" />\\n\\t\\t<HeaderEditor {headers} />\\n\\t\\t<BodyEditor\\n\\t\\t\\t{body}\\n\\t\\t\\t{content_extension}\\n\\t\\t\\t{readonly}\\n\\t\\t\\tcharset={charset_options.find((entry) => entry.id === selected_charset_id)?.text}\\n\\t\\t/>\\n\\t</div>\\n{/if}\\n\\n<style lang=\\"scss\\">.top {\\n  display: grid;\\n  grid-template-columns: 33% 33% 34%;\\n}\\n\\n.root {\\n  overflow: scroll;\\n}</style>\\n"],"names":[],"mappings":"AAkCmB,kBAAK,CACtB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GACjC,CAEA,mBAAM,CACJ,QAAQ,CAAE,MACZ"}`
};
const RequestEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { request } = $$props;
  let { readonly = false } = $$props;
  let headers = request.get_headers();
  let version = request.get_version();
  let method = request.get_method();
  let uri = request.get_uri();
  let body = request.get_body();
  let content_extension = headers.content_extension();
  let selected_charset_id = "0";
  if ($$props.request === void 0 && $$bindings.request && request !== void 0) $$bindings.request(request);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${request !== void 0 ? `<div class="root svelte-dlqxe9"><div class="top svelte-dlqxe9">${validate_component(TextInput, "TextInput").$$render(
      $$result,
      {
        readonly: true,
        hideLabel: true,
        size: "sm",
        value: version
      },
      {},
      {}
    )} ${validate_component(ComboBox, "ComboBox").$$render(
      $$result,
      {
        size: "sm",
        selectedId: "0",
        items: [{ id: "0", text: method }]
      },
      {},
      {}
    )} ${validate_component(ComboBox, "ComboBox").$$render(
      $$result,
      {
        size: "sm",
        items: charset_options,
        selectedId: selected_charset_id
      },
      {
        selectedId: ($$value) => {
          selected_charset_id = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${validate_component(TextInput, "TextInput").$$render($$result, { hideLabel: true, value: uri, size: "sm" }, {}, {})} ${validate_component(HeaderEditor, "HeaderEditor").$$render($$result, { headers }, {}, {})} ${validate_component(BodyEditor, "BodyEditor").$$render(
      $$result,
      {
        body,
        content_extension,
        readonly,
        charset: charset_options.find((entry) => entry.id === selected_charset_id)?.text
      },
      {},
      {}
    )}</div>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const css$2 = {
  code: ".top.svelte-x38b0d{display:grid;grid-template-columns:33% 33% 34%}",
  map: `{"version":3,"file":"ResponseEditor.svelte","sources":["ResponseEditor.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { ComboBox, Select, SelectItem, TextInput } from \\"carbon-components-svelte\\";\\nimport HeaderEditor from \\"./HeaderEditor.svelte\\";\\nimport BodyEditor from \\"./BodyEditor.svelte\\";\\nimport { charset_options } from \\"$lib/body\\";\\nexport let response;\\nexport let readonly = false;\\nlet headers = response.get_headers();\\nlet status = response.get_status();\\nlet version = response.get_version();\\nlet body = response.get_body();\\nlet content_extension = headers.content_extension();\\nlet selected_charset_id = \\"0\\";\\n<\/script>\\n\\n{#if response !== undefined}\\n\\t<div class=\\"top\\">\\n\\t\\t<TextInput readonly hideLabel size=\\"sm\\" value={version} />\\n\\n\\t\\t<ComboBox size=\\"sm\\" selectedId=\\"0\\" items={[{ id: '0', text: status.toString() }]} />\\n\\t\\t<ComboBox size=\\"sm\\" bind:selectedId={selected_charset_id} items={charset_options} />\\n\\t</div>\\n\\t<HeaderEditor {headers} />\\n\\t{#key selected_charset_id}\\n\\t\\t<BodyEditor\\n\\t\\t\\t{body}\\n\\t\\t\\t{content_extension}\\n\\t\\t\\t{readonly}\\n\\t\\t\\tcharset={charset_options.find((entry) => entry.id === selected_charset_id)?.text}\\n\\t\\t/>\\n\\t{/key}\\n{/if}\\n\\n<style lang=\\"scss\\">.top {\\n  display: grid;\\n  grid-template-columns: 33% 33% 34%;\\n}</style>\\n"],"names":[],"mappings":"AAgCmB,kBAAK,CACtB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GACjC"}`
};
const ResponseEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { response } = $$props;
  let { readonly = false } = $$props;
  let headers = response.get_headers();
  let status = response.get_status();
  let version = response.get_version();
  let body = response.get_body();
  let content_extension = headers.content_extension();
  let selected_charset_id = "0";
  if ($$props.response === void 0 && $$bindings.response && response !== void 0) $$bindings.response(response);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${response !== void 0 ? `<div class="top svelte-x38b0d">${validate_component(TextInput, "TextInput").$$render(
      $$result,
      {
        readonly: true,
        hideLabel: true,
        size: "sm",
        value: version
      },
      {},
      {}
    )} ${validate_component(ComboBox, "ComboBox").$$render(
      $$result,
      {
        size: "sm",
        selectedId: "0",
        items: [{ id: "0", text: status.toString() }]
      },
      {},
      {}
    )} ${validate_component(ComboBox, "ComboBox").$$render(
      $$result,
      {
        size: "sm",
        items: charset_options,
        selectedId: selected_charset_id
      },
      {
        selectedId: ($$value) => {
          selected_charset_id = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${validate_component(HeaderEditor, "HeaderEditor").$$render($$result, { headers }, {}, {})} ${validate_component(BodyEditor, "BodyEditor").$$render(
      $$result,
      {
        body,
        content_extension,
        readonly,
        charset: charset_options.find((entry) => entry.id === selected_charset_id)?.text
      },
      {},
      {}
    )}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const css$1 = {
  code: ".HttpEditor.svelte-n2e3ae.svelte-n2e3ae{height:100%;overflow:scroll}.HttpEditor.svelte-n2e3ae .request.svelte-n2e3ae{height:100%;overflow:scroll}.HttpEditor.svelte-n2e3ae .response.svelte-n2e3ae{overflow:scroll;height:100%}",
  map: '{"version":3,"file":"HttpEditor.svelte","sources":["HttpEditor.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { Splitpanes, Pane } from \\"$lib/components/Splitpanes\\";\\nimport RequestEditor from \\"./RequestEditor.svelte\\";\\nimport ResponseEditor from \\"./ResponseEditor.svelte\\";\\nexport let readonly = false;\\nexport let pair;\\nlet request = pair?.request;\\nlet response = pair?.response;\\n<\/script>\\n\\n<div class=\\"HttpEditor\\">\\n\\t<Splitpanes style=\\"height: 100%;\\">\\n\\t\\t<Pane size={50}>\\n\\t\\t\\t{#key request}\\n\\t\\t\\t\\t{#if request !== undefined}\\n\\t\\t\\t\\t\\t<div class=\\"request\\">\\n\\t\\t\\t\\t\\t\\t<RequestEditor {readonly} {request} />\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t{/key}\\n\\t\\t</Pane>\\n\\t\\t<Pane size={50}>\\n\\t\\t\\t<!-- {#key response} -->\\n\\t\\t\\t{#if response !== undefined}\\n\\t\\t\\t\\t<div class=\\"response\\">\\n\\t\\t\\t\\t\\t<ResponseEditor {readonly} {response} />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t\\t<!-- {/key response} -->\\n\\t\\t</Pane>\\n\\t</Splitpanes>\\n</div>\\n\\n<style lang=\\"scss\\">.HttpEditor {\\n  height: 100%;\\n  overflow: scroll;\\n}\\n.HttpEditor .request {\\n  height: 100%;\\n  overflow: scroll;\\n}\\n.HttpEditor .response {\\n  overflow: scroll;\\n  height: 100%;\\n}</style>\\n"],"names":[],"mappings":"AAgCmB,uCAAY,CAC7B,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MACZ,CACA,yBAAW,CAAC,sBAAS,CACnB,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MACZ,CACA,yBAAW,CAAC,uBAAU,CACpB,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,IACV"}'
};
const HttpEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { readonly = false } = $$props;
  let { pair } = $$props;
  let request = pair?.request;
  let response = pair?.response;
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  if ($$props.pair === void 0 && $$bindings.pair && pair !== void 0) $$bindings.pair(pair);
  $$result.css.add(css$1);
  return `<div class="HttpEditor svelte-n2e3ae">${validate_component(Splitpanes, "Splitpanes").$$render($$result, { style: "height: 100%;" }, {}, {
    default: () => {
      return `${validate_component(Pane, "Pane").$$render($$result, { size: 50 }, {}, {
        default: () => {
          return `${request !== void 0 ? `<div class="request svelte-n2e3ae">${validate_component(RequestEditor, "RequestEditor").$$render($$result, { readonly, request }, {}, {})}</div>` : ``}`;
        }
      })} ${validate_component(Pane, "Pane").$$render($$result, { size: 50 }, {}, {
        default: () => {
          return ` ${response !== void 0 ? `<div class="response svelte-n2e3ae">${validate_component(ResponseEditor, "ResponseEditor").$$render($$result, { readonly, response }, {}, {})}</div>` : ``} `;
        }
      })}`;
    }
  })} </div>`;
});
const css = {
  code: ".history.svelte-7vliks.svelte-7vliks{height:100%}.history.svelte-7vliks .http_list.svelte-7vliks{overflow:scroll;height:100%}",
  map: '{"version":3,"file":"history.svelte","sources":["history.svelte"],"sourcesContent":["<script lang=\\"ts\\">import HttpEditor from \\"$lib/components/HttpEditor/HttpEditor.svelte\\";\\nimport {\\n  get_small_history,\\n  get_small_history_header,\\n  history\\n} from \\"$lib/proxy\\";\\nimport { DataTable } from \\"carbon-components-svelte\\";\\nimport { Splitpanes, Pane } from \\"$lib/components/Splitpanes\\";\\nimport { writable } from \\"svelte/store\\";\\nlet selected_pair = writable();\\nasync function update_selected_pair(id) {\\n  const index = $history.findIndex((entry) => entry.id === id);\\n  if (index > 0) {\\n    selected_pair.set($history[index]);\\n  }\\n}\\nlet sortKey = void 0;\\nlet sortDirection = void 0;\\n<\/script>\\n\\n<div class=\\"history\\">\\n\\t<Splitpanes horizontal style=\\"height: 100%;\\">\\n\\t\\t<Pane size={50}>\\n\\t\\t\\t<div class=\\"http_list\\">\\n\\t\\t\\t\\t{#key $history}\\n\\t\\t\\t\\t\\t{#await get_small_history($history) then small_history}\\n\\t\\t\\t\\t\\t\\t<DataTable\\n\\t\\t\\t\\t\\t\\t\\tbind:sortKey\\n\\t\\t\\t\\t\\t\\t\\tbind:sortDirection\\n\\t\\t\\t\\t\\t\\t\\tsortable\\n\\t\\t\\t\\t\\t\\t\\theaders={get_small_history_header(small_history[0])}\\n\\t\\t\\t\\t\\t\\t\\trows={small_history}\\n\\t\\t\\t\\t\\t\\t\\ton:click:row={(event) => {\\n\\t\\t\\t\\t\\t\\t\\t\\tupdate_selected_pair(event.detail.id);\\n\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\tsize=\\"short\\"\\n\\t\\t\\t\\t\\t\\t></DataTable>\\n\\t\\t\\t\\t\\t{/await}\\n\\t\\t\\t\\t{/key}\\n\\t\\t\\t</div>\\n\\t\\t</Pane>\\n\\t\\t<Pane size={50}>\\n\\t\\t\\t{#key $selected_pair}\\n\\t\\t\\t\\t<HttpEditor readonly pair={$selected_pair} />\\n\\t\\t\\t{/key}\\n\\t\\t</Pane>\\n\\t</Splitpanes>\\n</div>\\n\\n<style lang=\\"scss\\">.history {\\n  height: 100%;\\n}\\n.history .http_list {\\n  overflow: scroll;\\n  height: 100%;\\n}</style>\\n"],"names":[],"mappings":"AAiDmB,oCAAS,CAC1B,MAAM,CAAE,IACV,CACA,sBAAQ,CAAC,wBAAW,CAClB,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,IACV"}'
};
const History = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $history, $$unsubscribe_history;
  let $selected_pair, $$unsubscribe_selected_pair;
  $$unsubscribe_history = subscribe(history, (value) => $history = value);
  let selected_pair = writable();
  $$unsubscribe_selected_pair = subscribe(selected_pair, (value) => $selected_pair = value);
  let sortKey = void 0;
  let sortDirection = void 0;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="history svelte-7vliks">${validate_component(Splitpanes, "Splitpanes").$$render($$result, { horizontal: true, style: "height: 100%;" }, {}, {
      default: () => {
        return `${validate_component(Pane, "Pane").$$render($$result, { size: 50 }, {}, {
          default: () => {
            return `<div class="http_list svelte-7vliks">${function(__value) {
              if (is_promise(__value)) {
                __value.then(null, noop);
                return ``;
              }
              return function(small_history) {
                return ` ${validate_component(DataTable, "DataTable").$$render(
                  $$result,
                  {
                    sortable: true,
                    headers: get_small_history_header(small_history[0]),
                    rows: small_history,
                    size: "short",
                    sortKey,
                    sortDirection
                  },
                  {
                    sortKey: ($$value) => {
                      sortKey = $$value;
                      $$settled = false;
                    },
                    sortDirection: ($$value) => {
                      sortDirection = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )} `;
              }(__value);
            }(get_small_history($history))}</div>`;
          }
        })} ${validate_component(Pane, "Pane").$$render($$result, { size: 50 }, {}, {
          default: () => {
            return `${validate_component(HttpEditor, "HttpEditor").$$render($$result, { readonly: true, pair: $selected_pair }, {}, {})}`;
          }
        })}`;
      }
    })} </div>`;
  } while (!$$settled);
  $$unsubscribe_history();
  $$unsubscribe_selected_pair();
  return $$rendered;
});
const Intercept = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const Proxy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Tabs_1, "Tabs").$$render($$result, { components: [History, Intercept] }, {}, {})}`;
});
const Repeater = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Tabs_1, "Tabs").$$render($$result, { components: [Proxy, Repeater] }, {}, {})}`;
});
export {
  Page as default
};