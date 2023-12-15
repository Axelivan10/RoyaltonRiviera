import React, { useEffect } from 'react'
import { Document, Text, Page, StyleSheet, Image, View} from '@react-pdf/renderer'
import logo from '../../assets/img/logo2.png'

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    icon: {
      width: 40,
      height: 40,
    },
    table: {
      width: '100%',
      border: '1px solid #E5E7EB', // Color similar al gris de Material Tailwind
    },
    tableHeader: {
      backgroundColor: '#F3F4F6', // Color similar al gris de Material Tailwind
      borderBottom: '1px solid #E5E7EB', // Color similar al gris de Material Tailwind
      flexDirection: 'row',
      padding: 12,
    },
    tableHeaderCell: {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottom: '1px solid #E5E7EB', // Color similar al gris de Material Tailwind
      padding: 12,
    },
    tableRowCell: {
      flex: 1,
      textAlign: 'center',
    },
    editCell: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: '#F3F4F6', // Color similar al gris de Material Tailwind
    },
  });

  interface EstadoDatos {
    position: string;
    cincuenta: number;
    sesenta: number;
    setenta: number;
    ochenta: number;
    noventa: number;
  }
  const TABLE_ROWS2 = [
    {
      position: "Total",
    },
  ];
  
const pdf = (props: { state: any, state2:any }) => {
     const { state, state2 } = props;

    return (
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Encabezado */}
            <View style={styles.header}>
              <Text style={styles.title}>Manning Information</Text>
              <Image style={styles.icon} src={logo} />
            </View>
            {/* Contenido de la tabla */}
            <View style={styles.table}>
              {/* Encabezado de la tabla */}
              <View style={styles.tableHeader}>
                {['Position', '50-60', '60-70', '70-80','80-90','90-100',].map((head, index) => (
                  <Text key={index} style={styles.tableHeaderCell}>
                    {head}
                  </Text>
                ))}
              </View>
              {/* Filas de la tabla */}
              {state.map(({ position, cincuenta, sesenta, setenta, ochenta, noventa }: EstadoDatos, index: number) => {
                const positionCapitalized =
                position.charAt(0).toUpperCase() +
                position.slice(1);
                const isLast = index === state.length - 1;
                const rowStyle = isLast ? styles.tableRow : { ...styles.tableRow, borderBottom: 'none' };
    
                return (
                  <View key={position} style={rowStyle}>
                    <Text style={styles.tableRowCell}>{positionCapitalized}</Text>
                    <Text style={styles.tableRowCell}>{cincuenta}</Text>
                    <Text style={styles.tableRowCell}>{sesenta}</Text>
                    <Text style={styles.tableRowCell}>{setenta}</Text>
                    <Text style={styles.tableRowCell}>{ochenta}</Text>
                    <Text style={styles.tableRowCell}>{noventa}</Text>

                  </View>
                );
              })}
            </View>

            <View style={styles.table}>
              {/* Encabezado de la tabla */}
              <View style={styles.tableHeader}>
                {['', '50-60', '60-70', '70-80','80-90','90-100',].map((head, index) => (
                  <Text key={index} style={styles.tableHeaderCell}>
                    {head}
                  </Text>
                ))}
              </View>
              {/* Filas de la tabla */}
              {TABLE_ROWS2.map(({ position },index) => {
                const isLast = index === state.length - 1;
                const rowStyle = isLast ? styles.tableRow : { ...styles.tableRow, borderBottom: 'none' };
    
                return (
                  <View key={position} style={rowStyle}>
                    <Text style={styles.tableRowCell}>{position}</Text>
                    <Text style={styles.tableRowCell}>{state2.cincuenta}</Text>
                    <Text style={styles.tableRowCell}>{state2.sesenta}</Text>
                    <Text style={styles.tableRowCell}>{state2.setenta}</Text>
                    <Text style={styles.tableRowCell}>{state2.ochenta}</Text>
                    <Text style={styles.tableRowCell}>{state2.noventa}</Text>
                  </View>
                );
              })}
            </View>
            
            {/* Nueva página */}
            <Page size="A4" style={styles.page}>
              <Text>Página 2</Text>
              {/* Puedes agregar más contenido para la nueva página aquí */}
            </Page>
          </Page>
        </Document>
      );
}

export default pdf