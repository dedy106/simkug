//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fOrder = function(owner, options, requester){
    if (owner){		
        window.app_frontend_alpa_fOrder.prototype.parent.constructor.call(this,owner,options);
        if (options !== undefined) this.updateByOptions(options);
        uses("portalui_label;portalui_saiGrid;portalui_panel;util_standar;server_util_mail");
        this.p1 = new portalui_roundPanel(this,{bound:[0,0,650,500],icon:"image/themes/dynpro/iconpanel.png",caption:"Informasi Produk",background:"image/themes/dynpro/roundpanelBgCenter.png",color:"#efefef",titleBg:"#95cae8"});
        this.cInfo = new portalui_control(this.p1,{bound:[20,20,500,80]});
        this.eNama  = new portalui_saiLabelEdit(this.p1,{bound:[20,110,this.width - 60,20],caption:"Nama",readOnly:true});
        this.eAlm  = new portalui_saiLabelEdit(this.p1,{bound:[20,133,this.width - 60,20],caption:"Alamat",readOnly:true});
        this.eEmail  = new portalui_saiLabelEdit(this.p1,{bound:[20,156,this.width - 60,20],caption:"Email",readOnly:true});
        this.eTelp  = new portalui_saiLabelEdit(this.p1,{bound:[20,179,this.width - 60,20],caption:"No Telp",readOnly:true});
        this.pGrid = new portalui_panel(this.p1,{bound:[20,210,this.width - 60,200],caption:"Daftar Belanja"});
        this.sg1 = new portalui_saiGrid(this.pGrid,{bound:[1,20,this.pGrid.width - 2,150],colCount:7,colTitle:["Kode Barang","Nama Barang","Satuan","Harga","Jumlah","Sub Total","Konfirmasi"],
            colFormat:[[3,4,5],[cfNilai, cfNilai, cfNilai]],colReadOnly:[true,[0,1,2,3,5],[]],
            picklist:[[6],[new portalui_arrayMap({items:["BELI","BATAL"]})]],buttonStyle:[[6],[bsAuto]],change:[this,"doSgChange"]});
        this.eTotal  = new portalui_saiLabelEdit(this.pGrid,{bound:[this.pGrid.width - 230,175,200,20],caption:"Total",readOnly:true,tipeText:ttNilai});    
        this.bOrder = new portalui_button(this.p1,{bound:[30,this.p1.height - 80,80,20],color:"#138e0a",icon:"icon/dynpro/keranjang.png",caption:"Checkout",hint:"Melanjutkan membeli semua produk diatas. ",click:[this,"doClick"],showHint:true});
        this.bCancel = new portalui_button(this.p1,{bound:[130,this.p1.height - 80,80,20],color:"#f00",icon:"icon/dynpro/cancel.png",caption:"Batal",hint:"Batal membeli semua produk diatas(keranjang dikosongkan)",click:[this,"doClick"],showHint:true});
        this.bTutup = new portalui_button(this.p1,{bound:[this.p1.width - 130,this.p1.height - 80,80,20],caption:"Belanja lagi",hint:"Kembali untuk belanja",showHint:true,click:[this,"doClick"]});
        this.requester = requester;
        this.closeToHide = false;
        this.dbLib = new util_dbUtility();
        this.dbLib.addListener(this);
        this.standarLib = new util_standar();
        this.mail = new server_util_mail();
        this.mail.addListener(this);
        this.mail.setUser("admin@klikalpa.com","saisai","tls");
		this.mail.configSmtp("smtp.gmail.com","465");
		this.mail.configPop3("pop.gmail.com","995");
    }
};
window.app_frontend_alpa_fOrder.extend(window.portalui_commonForm);
window.app_frontend_alpa_fOrder.implement({	
    setInfo: function(info){        
        try{
            this.noOrder = this.standarLib.noBuktiOtomatis(this.dbLib, "portal_order_m", "no_order", "ORD/"+this.app._mainForm.getPeriodeNow()+"/","0000");            
            this.cInfo.getCanvas().innerHTML="<table border='0' cellpadding='2' cellspacing='2'>"+
							  "<tr style='font-size:12px;color:#000000;'>"+
							    "<td width='100'>No. Order</td>"+
							    "<td width='30' align='center'>:</td>"+
							    "<td width='330'>"+this.noOrder+"</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;color:#000000;'>"+
							    "<td>Customer</td>"+
							    "<td align='center'>:</td>"+
							    "<td>"+info.id+"</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;color:#000000;'>"+
							    "<td>Tanggal Belanja</td>"+
							    "<td align='center'>:</td>"+
							    "<td>"+info.tgl+"</td>"+
							  "</tr>"+
							"</table>";
			this.eNama.setText(info.nama),this.eAlm.setText(info.alamat),this.eEmail.setText(info.email), this.eTelp.setText(info.telp);
			this.updateInfo();
			this.userInfo = info;
        }catch(e){
            alert(e);
        }
    },
    setCaption: function(data){
        this.p1.setCaption(data);
    },
    updateInfo: function(){
        var total = 0,item;                        
        this.sg1.clear();
        for (var i in this.app._myCart.objList){     
            item = this.app._myCart.get(i);
            this.sg1.appendData([item.id, item.nama, item.satuan,floatToNilai(item.price), 1,floatToNilai(item.price),'BELI']);         
        }                
        this.doSgChange(this.sg1,4,0);
    },
    doClick: function(sender){
        try{
            if (sender == this.bOrder) {
                try
        		{
                    var cekNol = false;
        			for(var i=0; i < this.sg1.rows.getLength(); i++){
        				if (this.sg1.getCell(4,i)===0 && this.sg1.getCell(6,i)!=="BATAL"){
        					cekNol=true;
        					break;
        				}
        			}
        			if (cekNol)
        			{
        				system.alert(this,"Jumlah item yang dibeli tidak boleh sama dengan nol.<br><br>"+
        							"Silakan edit terlebih dahulu atau ubah konfirmasi menjadi \"Batal\" jika ingin membatalkan pembelian.","");
        			}else
        			{
        				this.block("Sending Email....");
                        var id=this.standarLib.noBuktiOtomatis(this.dbLib, "portal_order_m", "no_order", "ORD/"+this.app._mainForm.getPeriodeNow()+"/","0000");
        				this.noOrder = id;
                        uses("server_util_arrayList");
        				var sql = new server_util_arrayList();
        				sql.add("insert into portal_order_m (no_order,kode_cust,tanggal,keterangan,status,cabang,kota, nama,alamat,sales,periode,kode_lokasi,nik_user,tgl_input,status_bayar) values "+
        						"('"+id+"','"+this.app.userlog+"','"+(new Date().getDateStr())+"','Transaksi tanggal "+(new Date().lclFormat())+"','F','-','-','"+this.eNama.getText()+"','"+this.eAlm.getText()+"','"+this.app.userlog+"','"+this.app._mainForm.getPeriodeNow()+"','"+this.app._lokasi+"','"+this.app.userlog+"','"+(new Date()).getDateStr()+"','0') ");
        				for(var i=0; i < this.sg1.rows.getLength(); i++)
        				{
        					if (this.sg1.getCell(6,i)!=="BATAL")
        					{
        						sql.add("insert into portal_order_d (kode_produk,no_order,jumlah,harga,bonus,kode_lokasi) values  "+
        						"('"+this.sg1.getCell(0,i)+"','"+id+"',"+parseNilai(this.sg1.getCell(4,i))+","+parseNilai(this.sg1.getCell(3,i))+",0,'"+this.app._lokasi+"') ");
        						//sql.add("update portal_belanja set status='1' "+
        						//"where kode_produk='"+this.sg.getCell(0,i)+"' and session='"+this.app._mainForm.session+"' and kode_lokasi='"+this.app._lokasi+"' ");
        					}
        				}        				
        				this.dbLib.execArraySQL(sql);        				
        			}
        		}catch(e)
        		{
        			this.unblock();
                    alert("form Order::doOrder "+e);
        		}
            };
            if (sender == this.bCancel) {                
                system.confirm(this,"Batal","Pemesanan dibatalkan.","Apakah anda yakin dengan pembatalan pemesanan ini?");
            }
            if (sender == this.bTutup) this.close();
            
        }catch(e){
            alert(e);
        }
    },
    doSgChange: function(sender, col, row){
        if (col == 4){
            var total = 0;
            for (var i =0;i < this.sg1.getRowCount();i++){
               total += nilaiToFloat(this.sg1.cells(5,i));  
            }
            this.eTotal.setText(floatToNilai(total));
        }
    },
    getTextMessage: function(){
        var pesan="Kami menerima pemesanan atas nama Bapak/Ibu "+this.userInfo.nama+" dengan email <strong>"+
				this.userInfo.email+"</strong> untuk pembelian sejumlah produk sesuai dengan data di bawah ini. "+
				"Silakan melakukan pembayaran via transfer ke rekening : <strong>(nama bank), atas "+
				"nama PT. ALPA SPARE PARTS # (no. rekenig). </strong><br><br>"+
				"Setelah selesai membayar, mohon konfirmasi pembayaran Anda dengan mengisi form "+
				"yang ada di website kami. Login dulu sebagai customer, kemudian masuk ke tab "+
				"Customer dan klik menu \"Input Pembayaran\" untuk mengisi form. Jika Anda "+
				"mengalami kesulitan atau membutuhkan informasi tambahan, silakan menghubungi "+
				"admin@klikalpa.com atau telepon 022-99xxxxx.<br><br><br><strong>"+
				"Data pesanan produk yang kami terima adalah sebagai berikut :</strong><br><br>"+
				"<table width='100%' border='0' cellpadding='0' cellspacing='0'>"+
				  "<tr>"+
					"<td width='19%' ><strong>Tanggal Transaksi</strong></td>"+
					"<td width='4%' align='center'>:</td>"+
					"<td width='28%' >"+this.userInfo.tgl+"</td>"+
					"<td width='49%' >&nbsp;</td>"+
				  "</tr>"+
				  "<tr>"+
					"<td><strong>Dipesan oleh</strong> </td>"+
					"<td align='center'>:</td>"+
					"<td>"+this.userInfo.nama+"</td>"+
					"<td><strong>Email :</strong> "+this.userInfo.email+"</td>"+
				  "</tr>"+
				  "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"+
				  "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"+
				  "<tr>"+
					"<td><strong>Nomor ID Pesanan</strong></td>"+
					"<td align='center'>:</td>"+
					"<td>"+this.noOrder+"</td>"+
					"<td>&nbsp;</td>"+
				  "</tr>"+
				"</table>"+
				"<table width='100%' border='1' cellspacing='0' cellpadding='0' bordercolor='#111111'>"+
				  "<tr>"+
					"<td width='40%' align='center'>NAMA PRODUK </td><td width='20%' align='center'>HARGA</td><td width='20%' align='center'>JUMLAH</td><td width='20%' align='center'>SUB TOTAL</td>"+
				  "</tr>";
		var total=0;
		for (var i=0;i < this.sg1.getRowCount();i++)
		{
			pesan+="<tr>"+
					"<td>"+this.sg1.cells(0,i)+", "+this.sg1.cells(1,i)+"</td>"+
					"<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					"<tr>"+
					  "<td width='21%'>Rp.</td>"+
					  "<td width='79%' align='right'>"+this.sg1.cells(3,i)+",-</td>"+
					"</tr>"+
				  "</table></td>"+
											"<td align='center'>"+this.sg1.cells(4,i)+"</td>"+
											"<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					"<tr>"+
					  "<td width='21%'>Rp.</td>"+
					  "<td width='79%' align='right'>"+this.sg1.cells(5,i)+",-</td>"+
					"</tr>"+
				  "</table></td>"+
				  "</tr>";
			total+=nilaiToFloat(this.sg1.cells(5,i));
		}
			
			pesan+="<tr>"+
					"<td colspan='3'>Biaya pengiriman : </td>"+
					"<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					"<tr>"+
					  "<td width='21%'>Rp.</td>"+
					  "<td width='79%' align='right'>0,-</td>"+
					"</tr>"+
				  "</table></td>"+
							  "</tr>"+
							  "<tr>"+
								"<td colspan='3' align='right'>TOTAL</td>"+
								"<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					"<tr>"+
					  "<td width='21%'>Rp.</td>"+
					  "<td width='79%' align='right'>"+floatToNilai(total)+",-</td>"+
					"</tr>"+
				  "</table></td>"+
							  "</tr>"+
							"</table><br>"+
							"<table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
							  "<tr>"+
								"<td width='15%'><strong>Nama Penerima </strong></td>"+
								"<td width='6%' align='center' valign='top'>:</td>"+
								"<td width='79%'>"+this.userInfo.nama+"</td>"+
							  "</tr>"+
							  "<tr>"+
								"<td valign='top'><strong>Alamat</strong></td>"+
								"<td align='center' valign='top'>:</td>"+
								"<td>"+this.userInfo.alamat+"</td>"+
							  "</tr>"+
							  "<tr>"+
								"<td><strong>Email</strong></td>"+
								"<td align='center' valign='top'>:</td>"+
								"<td>"+this.userInfo.email+"</td>"+
							  "</tr>"+
							  "<tr>"+
								"<td><strong>Telepon</strong></td>"+
								"<td align='center' valign='top'>:</td>"+
								"<td>"+this.userInfo.telp+"</td>"+
							  "</tr>"+
							  "<tr>"+
								"<td colspan='3'>&nbsp;</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;'>"+
								"<td colspan='3'>Syarat dan kondisi</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;'>"+
								"<td colspan='3'>1. Hanya pesanan yang telah melakukan pembayaran yang akan diproses untuk pengiriman.</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;'>"+
								"<td colspan='3'>2. Pesanan belum termasuk PPn 10%.</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;'>"+
								"<td colspan='3'>3. Harga dan stok dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</td>"+
							  "</tr>"+
							  "<tr>"+
								"<td colspan='3'><br><strong>Terima kasih telah berkunjung dan berbelanja di klikalpa.com</strong></td>"+
							  "</tr>"+
							  "<tr>"+
								"<td colspan='3'><br>Salam<br><br><br><br>www.klikalpa.com</td>"+
							"</table>";
		return pesan;
    },
    doRequestReady: function(sender, methodName, result){
        if (sender === this.mail){
            this.unblock();
			if (methodName === "sendMail"){
				system.info(this, "Pemesanan","Konfirmasi dari kami dikirim ke e-mail Anda.");
				this.app._myCart = new portalui_arrayMap();
				this.app._mainForm.updateUserCart();
				this.close();
			}
		}
		if (sender == this.dbLib){          
          switch(methodName){
              case "execArraySQL" :
                    if (result.toLowerCase().search("error") == -1){                
                        var subject="Pesanan "+this.noOrder;
        				var pesan=this.getTextMessage();
        				this.mail.send("admin@klikalpa.com",this.userInfo.email,subject,pesan);   
                    }else systemAPI.alert("Ada Error saat transaksi....");
              break;
          }
       } 
    },
    doModalResult: function(event, modalResult){
        if (modalResult !== mrOk) return;
        if (event == "Batal"){
            this.app._myCart = new portalui_arrayMap();
            this.app._mainForm.updateUserCart();
            this.close();
        }
    }
});
												
