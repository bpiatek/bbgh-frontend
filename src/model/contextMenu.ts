export type ContextMenuOption = {
  name: string;
  label: string;
  class: string|undefined;
};
export type ContextMenuSettings = {
  options: ContextMenuOption|string[];
  handler: (event: { item: unknown; option: ContextMenuOption }) => void;
  event: unknown;
}
