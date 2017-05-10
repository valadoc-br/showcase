---
layout: default
---

# Image

___

![image-title-here]({{ site.url }}/assets/img/menubar.png)

* A MenuBar created using XML and GtkBuilder.
* Create a MenuBar using XML
* Add the MenuBar to the window using GtkBuilder
* Add items to the menus
* Setup actions
* Choices submenu and items with state
* Actions: Application or Window?
* Complete XML UI file for this example
* Complete Vala file for this example
* Mnemonics
* Accelerators
* Translatable strings
* Relevant API documentation
* Exercises


### Create a MenuBar using XML

To create the menubar using XML:

Create menubar.ui using your favorite text editor.
Enter the following line at the top of the file:

```xml
	<?xml version="1.0"? encoding="UTF-8"?>
```

We want to create the interface which will contain our menubar and its submenus. Our menubar will contain File, Edit, Choices and Help submenus. We add the following XML code to the file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<interface>
  <menu id="menubar">
    <submenu>
      <attribute name="label">File</attribute>
    </submenu>
    <submenu>
      <attribute name="label">Edit</attribute>
    </submenu>
    <submenu>
      <attribute name="label">Choices</attribute>
    </submenu>
    <submenu>
      <attribute name="label">Help</attribute>
    </submenu>
  </menu>
</interface>
```

Now we will create the .vala file and use GtkBuilder to import the menubar.ui we just created.
Add the MenuBar to the window using GtkBuilder

```vala
public class MyWindow : Gtk.ApplicationWindow {
	internal MyWindow (MyApplication app) {
		Object (application: app, title: "MenuBar Example");
		this.set_default_size (200, 200);
	}
}

class MyApplication: Gtk.Application {
	protected override void activate () {
		new MyWindow (this).show ();
	}
	protected override void startup () {
		base.startup ();

		/* Setup menubar. */
		/* Get the UI file. */
		var builder = new Gtk.Builder ();
		try {
			builder.add_from_file ("menubar_basis.ui");
		/* Handle the exception. */
		} catch (Error e) {
			error ("Unable to load file: %s", e.message);
		}

		/* Get the menubar from the builder. */
		this.menubar = builder.get_object ("menubar") as MenuModel;
	}
}

/* main creates and runs the application. */
public int main (string[] args) {
	return new MyApplication ().run (args);
}

```

Now, compile the vala file, and run it. The application should look like the picture at the top of this page.
Add items to the menus
We start off by adding 2 menuitems to the File menu: New and Quit. We do this by adding a section to the the File submenu with these items. The menubar.ui should look like this (lines 6 to 13 inclusive comprise the newly added section):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<interface>
  <menu id="menubar">
    <submenu>
      <attribute name="label">File</attribute>
      <section>
        <item>
          <attribute name="label">New</attribute>
        </item>
        <item>
          <attribute name ="label">Quit</attribute>
        </item>
      </section>
    </submenu>
    <submenu>
      <attribute name="label">Edit</attribute>
    </submenu>
    <submenu>
      <attribute name="label">Choices</attribute>
    </submenu>
    <submenu>
      <attribute name="label">Help</attribute>
    </submenu>
  </menu>
</interface>
```

Following this pattern, you can now add a Copy and a Paste item to the Edit submenu, and an About item to the Help submenu. We will hold off on adding items to the Choices submenu until further in the tutorial.
You do not need to recompile the vala program if you only made changes to the UI file. Just run your previously compiled application, and the UI changes will be reflected.
Setup actions
This is a three step process.
First we create the ActionEntry array in the MyApplication class. An ActionEntry consists of:
the "action name" (mandatory)
the callback function to connect to the "activate" signal of the action (if applicable)
the type of the parameter that must be passed to the activate function for the action (if applicable)
the initial state for this action (if applicable)
the callback to connect to "change-state" signal (if applicable)

```vala
const ActionEntry[] actions = {
    { "new", new_cb }, // {"action name", callback_function}
    { "quit", quit_cb }
};
Second, we create the callback functions the actions are connected to.
void new_cb (SimpleAction action, Variant? parameter) {
    print ("You clicked \"New\"\n");
    //new MyWindow (this).show ();
}

void quit_cb (SimpleAction action, Variant? parameter) {
    print ("You clicked \"Quit\"\n");
    this.quit ();
}

```


And lastly, we connect the menu items to the actions in the XML file by adding the "action" attribute:
```xml
<item>
  <attribute name="label">New</attribute>
  <attribute name="action">app.new</attribute>
</item>
<item>
  <attribute name="label">Quit</attribute>
  <attribute name="action">app.quit</attribute>
</item>
```
Choices submenu and items with state

Lines 30 to 80 inclusive of the Complete XML UI file for this example demonstrate the XML code used to create the UI for Choices menu.
Actions: Application or Window?
Above, we created the "new" and "open" actions as part of the MyApplication class. Actions which control the application itself, such as "quit" should be created similarly.
Some actions, such as "copy" and "paste" deal with the window, not the application. Window actions should be created as part of the window class.
The complete example files contain both application actions and window applications. The window actions are the ones usually included in the application menu also. It is not good practice to include window actions in the application menu. For demonstration purposes, the complete example files which follow include XML in the UI file which creates the application menu which includes a "New" and "Open" item, and these are hooked up to the same actions as the menubar items of the same name.
Complete XML UI file for this example

```xml

<?xml version="1.0" encoding="UTF-8"?>
<interface>
  <menu id="menubar">
    <submenu>
      <attribute name="label">File</attribute>
      <section>
        <item>
          <attribute name="label">New</attribute>
          <attribute name="action">app.new</attribute>
        </item>
        <item>
          <attribute name="label">Quit</attribute>
          <attribute name="action">app.quit</attribute>
        </item>
      </section>
    </submenu>
    <submenu>
      <attribute name="label">Edit</attribute>
      <section>
        <item>
          <attribute name="label">Copy</attribute>
          <attribute name="action">win.copy</attribute>
        </item>
        <item>
          <attribute name="label">Paste</attribute>
          <attribute name="action">win.paste</attribute>
        </item>
      </section>
    </submenu>
    <submenu>
      <attribute name="label">Choices</attribute>
      <submenu>
        <attribute name="label">Shapes</attribute>
          <section>
            <item>
              <attribute name="label">Line</attribute>
              <attribute name="action">win.shape</attribute>
              <attribute name="target">line</attribute>
            </item>
            <item>
              <attribute name="label">Triangle</attribute>
              <attribute name="action">win.shape</attribute>
              <attribute name="target">triangle</attribute>
            </item>
            <item>
              <attribute name="label">Square</attribute>
              <attribute name="action">win.shape</attribute>
              <attribute name="target">square</attribute>
            </item>
            <item>
              <attribute name="label">Polygon</attribute>
              <attribute name="action">win.shape</attribute>
              <attribute name="target">polygon</attribute>
            </item>
            <item>
              <attribute name="label">Circle</attribute>
              <attribute name="action">win.shape</attribute>
              <attribute name="target">circle</attribute>
            </item>
          </section>
      </submenu>
      <section>
        <item>
          <attribute name="label">On</attribute>
          <attribute name="action">app.state</attribute>
          <attribute name="target">on</attribute>
        </item>
        <item>
          <attribute name="label">Off</attribute>
          <attribute name="action">app.state</attribute>
          <attribute name="target">off</attribute>
        </item>
      </section>
      <section>
        <item>
          <attribute name="label">Awesome</attribute>
          <attribute name="action">app.awesome</attribute>
        </item>
      </section>
    </submenu>
    <submenu>
      <attribute name="label">Help</attribute>
      <section>
        <item>
          <attribute name="label">About</attribute>
          <attribute name="action">win.about</attribute>
        </item>
      </section>
    </submenu>
  </menu>
  <menu id="appmenu">
    <section>
      <item>
        <attribute name="label">New</attribute>
        <attribute name="action">app.new</attribute>
      </item>
      <item>
        <attribute name="label">Quit</attribute>
        <attribute name="action">app.quit</attribute>
      </item>
    </section>
  </menu>
</interface>

```

Complete Vala file for this example

```vala

public class MyWindow : Gtk.ApplicationWindow {

	/* Callback functions for the window actions. */
	void copy_cb (SimpleAction action, Variant? parameter) {
		print ("\"Copy\" activated\n");
	}

	void paste_cb (SimpleAction action, Variant? parameter) {
		print ("\"Paste\" activated\n");
	}

	void shape_cb (SimpleAction action, Variant? parameter) {
		print ("shape is set to %s\n", parameter.get_string(null));
		action.set_state (parameter);
	}

	/* Create the window actions. */
	const ActionEntry[] actions = {
		/*{ "action name", cb to connect to "activate" signal, parameter type,
		     initial state, cb to connect to "change-state" signal } */
		{ "copy", copy_cb },
		{ "paste", paste_cb },
		{ "shape", shape_cb, "s", "'line'"}
	};

	internal MyWindow (MyApplication app) {
		Object (application: app, title: "MenuBar Example");
		this.set_default_size (200, 200);

		/* Setup window actions. */
		this.add_action_entries (actions, this);
	}
}

class MyApplication: Gtk.Application {
	protected override void activate () {
		new MyWindow (this).show ();
	}

	/* Callback functions for the application actions. */
	void new_cb (SimpleAction action, Variant? parameter) {
		//new MyWindow (this).show ();
		print ("You clicked \"New\"\n");
	}

	void quit_cb (SimpleAction action, Variant? parameter) {
		print ("You clicked \"Quit\"\n");
		this.quit ();
	}

	void awesome_cb (SimpleAction action, Variant? parameter) {
		var active = action.get_state ().get_boolean ();
		action.set_state (new Variant.boolean (!active));
		if (active)
			print ("You unchecked \"Awesome\"\n");
		else
			print ("You checked \"Awesome\"\n");
	}

	void state_cb (SimpleAction action, Variant? parameter) {
		print ("state is set to %s\n", parameter.get_string(null));
		action.set_state (parameter);
	}

	/* Create the application actions. */
	const ActionEntry[] actions = {
		{ "new", new_cb },
		{ "quit", quit_cb },
		{ "awesome", awesome_cb, null, "false" },
		{ "state", state_cb, "s", "'off'" }
	};

	protected override void startup () {
		base.startup ();

		/* Setup application actions. */
		this.add_action_entries (actions, this);

		/* Setup menubar and app_menu. */
		/* Get the UI file. */
		var builder = new Gtk.Builder ();
		try {
			builder.add_from_file ("menubar.ui");
		} catch (Error e) {
			error ("Unable to load file: %s", e.message);
		}

		/* Get the menubar from the builder. */
		this.menubar = builder.get_object ("menubar") as MenuModel;

		/* Get the app_menu from the builder. */
		this.app_menu = builder.get_object ("appmenu") as MenuModel;
	}
}

/* main creates and runs the application. */
public int main (string[] args) {
	return new MyApplication ().run (args);
}

```


Mnemonics
Labels may contain mnemonics. Mnemonics are underlined characters in the label, used for keyboard navigation. Mnemonics are created by placing an underscore before the mnemonic character. For example "_File" instead of just "File" in the menubar.ui label attribute.
The mnemonics are visible when you press the Alt key. Pressing Alt+F will open the File menu.
Accelerators
Accelerators can be explicitly added in the UI definitions. For example, it is common to be able to quit an application by pressing Ctrl+Q or to save a file by pressing Ctrl+S. To add an accelerator to the UI definition, you simply need add an "accel" attribute to the item.

```xml
<attribute name="accel">&lt;Primary&gt;q</attribute> 
```

will create the Ctrl+Q sequence when added to the Quit label item. Here, "Primary" refers to the Ctrl key on a PC or the ⌘ key on a Mac.

```xml
<item>
  <attribute name="label">_Quit</attribute>
  <attribute name="action">app.quit</attribute>
  <attribute name="accel">&lt;Primary&gt;q</attribute>
</item>
```

Translatable strings
Since GNOME applications are being translated into many languages, it is important that the strings in your application are translatable. To make a label translatable, simple set translatable="yes":

```xml
<attribute name="label" translatable="yes">Quit</attribute>
```