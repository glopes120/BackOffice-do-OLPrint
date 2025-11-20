
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Order, Product } from '../types';

export const generatePDFReport = (orders: Order[], products: Product[], stats: any[]) => {
  const doc = new jsPDF();
  
  // Configurações de fonte e cor
  const primaryColor = [79, 70, 229]; // Indigo 600
  
  // Cabeçalho
  doc.setFontSize(24);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('OLPrint', 14, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text('Relatório de Gestão & Vendas', 14, 28);
  
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-PT')} às ${new Date().toLocaleTimeString('pt-PT')}`, 14, 35);
  
  doc.setDrawColor(200);
  doc.line(14, 40, 196, 40);

  // Seção de Estatísticas
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Resumo Executivo', 14, 50);
  
  let yPos = 60;
  stats.forEach((stat) => {
     doc.setFontSize(11);
     doc.setTextColor(80);
     doc.text(`${stat.label}:`, 14, yPos);
     
     doc.setFontSize(11);
     doc.setTextColor(0);
     doc.setFont("helvetica", "bold");
     doc.text(stat.value, 50, yPos);
     doc.setFont("helvetica", "normal");
     
     yPos += 7;
  });

  // Tabela de Últimos Pedidos
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Últimos Pedidos', 14, yPos + 10);
  
  autoTable(doc, {
    startY: yPos + 15,
    head: [['ID', 'Cliente', 'Data', 'Status', 'Itens', 'Total']],
    body: orders.map(order => [
      order.id, 
      order.customerName, 
      new Date(order.date).toLocaleDateString('pt-PT'), 
      order.status,
      order.items.toString(),
      `€ ${order.total.toFixed(2)}`
    ]),
    headStyles: { fillColor: primaryColor as any },
    styles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [245, 247, 250] }
  });

  // Tabela de Estoque Baixo
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  
  // Verificar se há espaço suficiente, senão nova página
  if (finalY > 240) {
      doc.addPage();
      doc.text('Produtos com Stock Baixo (< 10 un)', 14, 20);
  } else {
      doc.text('Produtos com Stock Baixo (< 10 un)', 14, finalY + 15);
  }

  const lowStock = products.filter(p => p.stock < 10);
  const startYProducts = finalY > 240 ? 25 : finalY + 20;

  autoTable(doc, {
    startY: startYProducts,
    head: [['Produto', 'Marca', 'Categoria', 'Stock', 'Preço']],
    body: lowStock.map(p => [
      p.name,
      p.brand,
      p.category,
      p.stock.toString(),
      `€ ${p.price.toFixed(2)}`
    ]),
    headStyles: { fillColor: [220, 38, 38] }, // Vermelho para alerta
    styles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [254, 242, 242] }
  });

  // Rodapé
  const pageCount = (doc as any).internal.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Página ${i} de ${pageCount} - Documento Confidencial OLPrint`, 105, 285, { align: 'center' });
  }

  doc.save(`OLPrint_Relatorio_${new Date().toISOString().split('T')[0]}.pdf`);
};