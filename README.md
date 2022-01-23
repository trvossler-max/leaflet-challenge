## Visualizing Data with Leaflet

![1-Logo](Images/1-Logo.png)

This project uses leaflet to visualize earthquake data from the United States Geological Survey, or USGS for short. The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

The project includes a new set of tools that will allow users to visualize this earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. The objective is enable users to be  able to visualize a massive amount of data and display it in a meaningful way to better educate the public and other government organizations.


### Project Components

![2-BasicMap](Images/2-BasicMap.png)


1. **Data Set**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. That data is available at [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page. The data used includes "All Earthquakes from the Past 7 Days", and the URL was used to pull a JSON representation of the data for the visualization.

   ![4-JSON](Images/4-JSON.png)

2. **Import & Visualize the Data**

   A webpage is created to map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * The data markers reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

   * Popups are enabled that provide additional information about the earthquake when a marker is clicked.

   * The legend provides context for the map data.

   * Four types of maps have been included (Satellite, Gray, Dark, Outdoors) and the user can toggle between maptypes.

3. **Additional Data**

![5-Advanced](Images/5-Advanced.png)

A second data set was applied to the map to illustrate the relationship between tectonic plates and seismic activity.  Data on tectonic plates was found at <https://github.com/fraxen/tectonicplates>.

This visualization included:

* Plotting a second data set on the map.

* Adding a techtonic plate overlay with layer controls that can be toggled on and off.

### Viewing the web-page maps/visualizations

The interactive web-page can be viewed by opening the html.index file from Visual Studio using Live Server. All fiels withing the Leaflet-Step-1 folder must be avaialable to the html.index file in order to launch using Live Server.

### File Structure

Images folder - Includes images used in readme file
Leaflet-Step-1 folder - Includes index.html file
   Static Subfolder - includes css and js subfolders
      css Subfolder - includes style.css file
      js Subfolder - includes config.js and logic.js files