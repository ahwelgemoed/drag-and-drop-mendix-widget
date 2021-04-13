</br>
<div align="center">
<a align="center" href="https://github.com/mendixlabs/app-services-components">
<span align="center">
⚠️ This Repo has been moved. Click To View ⚠️
</span>
</a>
</div>
</br>

<h1 align="center">Drag and Drop Widget for Mendix</h1>

<p align="center">
    <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/DragandDrop.png" target="_blank" />
    <br>
    <br>
   A Drag and Drop Widget for Mendix (with Touch Support for Mobile Devices)
    <br>
    <br>
  <a href="">
    <img alt="License: MIT" src="https://img.shields.io/badge/Status-Production-blue" target="_blank" />
  </a>
  <a href="">
    <img alt="License: MIT" src="https://img.shields.io/github/issues/ahwelgemoed/drag-and-drop-mendix-widget" target="_blank" />
  </a>
  <a href="">
    <img alt="GitHub issues" src="https://img.shields.io/github/release/ahwelgemoed/drag-and-drop-mendix-widget" target="_blank" />
  </a>
  <a href="https://appstore.home.mendix.com/link/modeler/">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Studio%20version-8.12%2B-blue.svg" target="_blank" />
  </a>
  <a href="https://docs.mendix.com/developerportal/app-store/app-store-content-support">
    <img alt="GitHub issues" src="https://img.shields.io/badge/Support-Community%20(no%20active%20support)-orange.svg" target="_blank" />
  </a>
  <a href="/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-Apache%202.0-orange.svg" target="_blank" />
  </a>
  <br>

</p>
<p align="center">
    <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/simpleList.gif" target="_blank" />
        <br>
        <p>Ordering List</p>
        <br>
    <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/widgetToWidget.gif" target="_blank" />
        <br>
        <p>Enum Filtered List</p>
        <br>
    <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/2ds.gif" target="_blank" />
        <br>
        <p>2 Entities in Domain Model</p>
        <hr>
</p>

Some key features:

-   Sort a list.
-   Drag from one List to another, using enum to divide between Lists.
-   Drag from one entity to another

#### [Demo Here](https://widgetcommonsappservices-sandbox.mxapps.io/index.html?profile=Responsive)

The idea behind it:

You wrap all the drag and droppable widgets into one containing dataview that is connected to a simple non persistable
entity with one string attribute. This is used to manage state between the widgets. For every column you want you
implement one Widget and configure it as set out below. this will give you the ability to order horizontally inside a
column and vertically (drag between one widget and another).

<p align="center">
<h3>Usage</h3>
 <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/p1.png" target="_blank" />
 <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/p2.png" target="_blank" />
</p>

| Object list group     | List         | List of items to Show cards for                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UUID/Status           | `string`     | If the attribute you are filtering on is an ENUM and all the data is coming from the same Data source (i.e same Entity in the domain model) use the same Enum here to give the widget context of what it is displaying. If how ever you are dragging and dropping between 2 different Data sources (Different Entities with data similar structures), this field must be an unique id. In either case this field will be unique to for every instance of the widgets you have. |
| Data Source Name      | `string`     | Text Name of the Data Source _(only used for different data sources)_                                                                                                                                                                                                                                                                                                                                                                                                          |
| In Coming Data        | `datasource` | Specify the Data to display, usually a Micro- or Nano- Flow where the Mendix Dev Limits and sorts the Incoming data.                                                                                                                                                                                                                                                                                                                                                           |
| Non Persistable Data  | `datasource` | The non persistable data entity you wrap all your widgets in. This is used as state in the widget                                                                                                                                                                                                                                                                                                                                                                              |
| Same Column Drop      | `action`     | microflow to trigger if data comes in from the same column                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Different Column Drop | `action`     | microflow to trigger if data comes in from different column                                                                                                                                                                                                                                                                                                                                                                                                                    |

## Column Drop Actions

We provide some pre-created actions that you should implement and configure.

You can download "DragandDrop*Utils.mpk" [\_here*](https://github.com/ahwelgemoed/drag-and-drop-mendix-widget/releases)

### Same Column Drop

-   Same Datasource _(Same Entity)_

    -   After importing the Commons File Find the Folder called `nanoflows` in the `draganddrop` folder. Use the
        nanoflow called `Same_Col_Drop_NF`. Copy it into your project and start setting it up.

        -   Configure the incoming data to be that of your non-persistable data source you wrapped the widget in.

            -   Configure the 3 Strings:

                -   `nonPersistableModelName` - Model name of the Non Persistable Model (i.e:
                    DragAndDropWidget.SimpleListState)
                -   `nonPersistableAttName` - Attribute name of the Non Persistable Model (i.e: json)
                -   `persistableOrderAtt` - Attribute name used to 'sort' the Persistable Model (i.e: Order)

    -   Then copy over the Javascript Action in the folder `Javascript_Actions` called `Same_Col_Drop_JS` and configure
        the nanoflow to use it, by setting the incoming parameters to that that you created in the nano flow.

    This action does some interesting stuff: It parses the Json coming in from the React Widget, Loops offer the array
    of mxObjects then fetched that object on very iteration Updates the order attribute and then commits this.

    The React Widget handles the sorting after the Mendix dev sets it once. All objects in that list will have new
    updated order values, after the initial drop. Thus what ever is selected as the 'order' value, must not be unique.
    The order is also seen as irrelevant to the end user and should never be displayed to them. It has been build in
    such a way that the React State and Mendix state should never run out of sync with each other, and seems robust.

### Different Column Drop

Is called by THIS widget when THAT (another) widget drops an Object into it.

---

#### Same Datasource _(Same Entity)_

---

-   After importing the Commons File Find the Folder called `nanoflows` in the `draganddrop` folder. Use the nanoflow
    called `Diff_Col_Drop_NF`. Copy it into your project and start setting it up.

    -   Configure the incoming data to be that of your non-persistable data source you wrapped the widget in.

        -   Configure the 4 Strings:

            -   `nonPersistableModelName` - Model name of the Non Persistable Model (i.e:
                DragAndDropWidget.SimpleListState)
            -   `nonPersistableAttName` - Attribute name of the Non Persistable Model (i.e: `json`)
            -   `persistableOrderAtt` - Attribute name used to 'sort' the Persistable Model (i.e: `Order`)
            -   `persistableAttName` - Attribute name used to 'filter' the Persistable Model (i.e: `Status`)

    -   Then copy over the Javascript Action in the folder `Javascript_Actions` called `Diff_Col_Drop_JS` and configure
        the nanoflow to use it, by setting the incoming parameters to that that you created in the nano flow.

---

#### Different Datasource _(Different Entity)_

---

**NOTE - This Feature Currently only works for 2 widgets at one time (2 Draggable Columns)**

Here you can drag an item from one column to another, the said Nano- & Micro- flows will reorder the list, create the
entity in the new list and then delete it form the the old list.

Here is gets tricky and you must keep track of naming your flows as at some point you target the Widget you are dragging
into and sometimes the Widget you are dragging out of.

-   After importing the Commons File Find the Folder called `nanoflows` in the `draganddrop` folder. Use the nanoflow
    called `Diff_Col_Drop_Diff_Ds_NF`. Copy it into your project and start setting it up. (Same as the rest)

-   Configure the incoming data to be that of your non-persistable data source you wrapped the widget in.

    -   Configure the 3 Strings:

        -   `nonPersistableModelName` - Model name of the Non Persistable Model (i.e: DragAndDropWidget.SimpleListState)
        -   `nonPersistableAttName` - Attribute name of the Non Persistable Model (i.e: `json`)
        -   `persistableOrderAtt` - Attribute name used to 'sort' the Persistable Model (i.e: `Order`)

    -   Then copy over the Javascript Action in the folder `Javascript_Actions` called `Diff_Col_Drop_Diff_Ds_JS` and
        configure the nanoflow to use it, by setting the incoming parameters to that that you created in the nano flow.

        **Note** Make sure to set the return object from the JS action to that of the other column (The Column dragged
        from (The object that is going to be deleted)).

    -   Add a Call to a mircroflow after the JS action and call the `Delete` microflow .

        -   This microflow will delete the object. Pass the return object from the Js function into this microflow call.

        -   Inside the delete microflow configure it to delete the passed down parameter and make sure to check the
            `refresh client` option.

## Styling

The Widget exposes 3 Classnames you can use to style the list items:

-   `drag-and-drop__is-over` : Classname added when draggable item is hovering over this item
-   `drag-and-drop__is-dragging` : Classname added to draggable item
-   `drag-and-drop__empty-list` : Classname added to an Empty Widget _(no data in column)_

## Screenshots

<p align="center">
 <h4>Modeler Look</h4>
 <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/mxOverview.png" target="_blank" />
 <br>
 <h4>Web Look</h4>
 <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/widgetToWidget.gif" target="_blank" />
 <h4>Incoming Data (Nano- or microflow )</h4>
 <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/get_mf.png" target="_blank" />
 <h4>Create Non Persistable Data (Nano- or microflow )</h4>
 <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/non_state.png" target="_blank" />
 <h4>Same Column Drop (nanoflow)</h4>
 <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/Same_Col_Drop_NF.png" target="_blank" />
 <h4>Different Column Drop (nanoflow)</h4>
 <img  align="center" alt="headerIMG" src="https://raw.githubusercontent.com/ahwelgemoed/drag-and-drop-mendix-widget/main/assets/Diff_Col_Drop_NF.png" target="_blank" />
</p>

## Issues || Track Features

Add issues to [project](https://github.com/ahwelgemoed/drag-and-drop-mendix-widget/projects/1?add_cards_query=is%3Aopen)
board or open an GH issue.
