window.app_saku3_transaksi_tu_kantin_fClosingKasir = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kantin_fClosingKasir.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kantin_fClosingKasir";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Closing Shift Kasir", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible: false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,13,98,18]});	
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Closing Shift","List Closing Shift"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["No Closing","Tanggal","Kantin","Keterangan","Total"],
					colWidth:[[4,3,2,1,0],[100,300,250,100,100]],						
					readOnly:true,
					colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Closing",click:[this,"doLoad"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Close Shift", maxLength:20, tag:1,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});											
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:100, tag:1});						
		this.cb_kantin = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Kode Kantin", readOnly:true, tag:1,change:[this,"doChange"]});								
		this.cb_pic = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"PIC ", readOnly:true, tag:2});		
		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tanggal Nota", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18]});		
		this.e_tot = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[790,13,200,20],caption:"Total", maxLength:20, readOnly:true, tag:1, tipeText:ttNilai,text:"0"});		
		this.bTampil = new button(this.pc1.childPage[0],{bound:[680,13,80,18],caption:"Tampil Data",click:[this,"doTampil"]});					

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,30,990,280], childPage:["Data Nota","Detail Total","Detail Barang"]});			
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Nota","Tgl Nota","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,250,100,120]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					readOnly:true,
					colFormat:[[3],[cfNilai]],		
					autoAppend:false,			
					defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});
		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:9,
		            colTitle:["Status Bayar","Total"],
					colWidth:[[1,0],[150,120]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					readOnly:true,
					colFormat:[[1],[cfNilai]],	
					autoAppend:false,				
					defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager3"]});
			
		this.sg5 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
					colTitle:["Kode Barang","Nama Barang","Satuan","Qty Terjual","Stok Awal","Stok Akhir"],
					colWidth:[[5,4,3,2,1,0],[80,80,80,80,200,120]],					
					columnReadOnly:[true,[0,1,2,3,5],[4]],
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],	
					change:[this,"doChangeCell5"],		
					autoAppend:false,		
					defaultRow:1});
		this.sgn5 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg5});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);

		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			
			var data = this.dbLib.getDataProvider("select kode_kantin from ktu_user where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.app._userLog+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){				
					this.kodeKantin = line.kode_kantin;
				}					
			}	

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_kantin.setSQL("select kode_kantin, nama from ktu_kantin where kode_kantin='"+this.kodeKantin+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Kantin",true);										
			this.cb_pic.setSQL("select nik, nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data PIC",true);
			
			this.cb_kantin.setText(this.kodeKantin);
			this.cb_pic.setText(this.app._userLog);
			this.sg1.clear(1);	

		}catch(e){
			systemAPI.alert(e);
		}
		
	}
};
window.app_saku3_transaksi_tu_kantin_fClosingKasir.extend(window.childForm);
window.app_saku3_transaksi_tu_kantin_fClosingKasir.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{
			if (this.stsSimpan == 1) this.doClick();					
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if(this.stsSimpan == 0){
						sql.add("delete from ktu_closing_m where no_closing = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update ktu_nota_m set no_closing = '-' where no_closing = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
						sql.add("delete from ktu_closing_brg where no_closing = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}	
					sql.add("insert into ktu_closing_m(no_closing,tanggal,tgl_nota,pic,kode_kantin,kode_lokasi,nik_user,tgl_input,periode,total,ket,no_ba) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.cb_pic.getText()+"','"+this.cb_kantin.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_tot.getText())+",'"+this.e_ket.getText()+"','-')");

					for (var i=0;i < this.dataJU4.rs.rows.length;i++){
						var line = this.dataJU4.rs.rows[i];
							sql.add("update a set a.no_closing='"+this.e_nb.getText()+"' "+
						        "from ktu_nota_m a "+
								"where a.no_bukti = '"+this.dataJU4.rs.rows[i].no_bukti+"' and a.kode_kantin='"+this.cb_kantin.getText()+"' and a.tanggal='"+this.dp_d1.getDateString()+"' and a.nik_user='"+this.cb_pic.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");	
					}

					if (this.sg5.getRowValidCount() > 0){
						for (var i=0;i < this.sg5.getRowCount();i++){
							if (this.sg5.rowValid(i)){								
								sql.add("insert into ktu_closing_brg(nu,no_closing,kode_lokasi,kode_barang,satuan,jumlah,sawal,sakhir) values "+
										"("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg5.cells(0,i)+"','"+this.sg5.cells(2,i)+"',"+nilaiToFloat(this.sg5.cells(3,i))+","+nilaiToFloat(this.sg5.cells(4,i))+","+nilaiToFloat(this.sg5.cells(5,i))+")");
							}
						}
					}
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from ktu_closing_m where no_closing = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update ktu_nota_m set no_closing = '-' where no_closing = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ktu_closing_brg where no_closing = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.stsSimpan = 1;
				this.sg4.clear(1);
				this.sg3.clear(1);
				this.sg5.clear(1);
				this.doClick();
				this.dp_d1.setReadOnly(false);
				this.bTampil.show();
				break;
				
			case "simpan" :	
			case "ubah" :
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_tot.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai total tidak boleh 0 atau kurang.");
					return false;						
				}				
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},		
	doClick: function(sender){	
		if (this.stsSimpan == 0) {
			this.dp_d1.setReadOnly(false);
			this.e_tcash.setText("0");
			this.e_tunai.setText("0");
			this.e_tot.setText("0");
			this.bTampil.show();
		}	
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ktu_closing_m','no_closing',this.app._lokasi+"-CS"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_ket.setFocus();
		this.stsSimpan = 1;
		this.sg1.clear(1);
		this.sg4.clear(1);
	},			
	doTampil:function(sender){	
		try{							
			if (this.cb_kantin.getText() != "" && this.cb_pic.getText() != "") {	
				this.pc1.setActivePage(this.pc1.childPage[0]);
				var strSQL = "select a.no_bukti, a.tanggal, a.ket, a.nilai "+
							 "from ktu_nota_m a "+ 					
							 "where a.kode_kantin =  '"+this.cb_kantin.getText()+"' and a.tanggal = '"+this.dp_d1.getDateString()+"' and a.no_closing = '-' and a.nik_user = '"+this.cb_pic.getText()+"' ";		 							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU4 = data;
					this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn4.rearrange();
					this.doTampilData4(1);

					var tot = 0;
					var tota = 0;
					var total = 0;
					
					var line;
					for (var i=0;i < this.dataJU4.rs.rows.length;i++){
						line = this.dataJU4.rs.rows[i];
						total+=parseFloat(line.nilai);
					}			
					this.e_tot.setText(floatToNilai(total));
				} else this.sg4.clear(1);

				var strSQL = "select bb.kode_bayar as status,SUM(bb.nilai) as nilai "+
							 "from ktu_nota_m a  "+
							 "inner join ktu_nota_bayar bb on a.no_bukti=bb.no_bukti and a.kode_lokasi=bb.kode_lokasi "+
							 "where a.kode_kantin =  '"+this.cb_kantin.getText()+"' and a.tanggal = '"+this.dp_d1.getDateString()+
							 "' and a.no_closing = '-' and a.nik_user = '"+this.cb_pic.getText()+"' group by bb.kode_bayar  ";		 							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU3 = data;
					this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn3.rearrange();
					this.doTampilData3(1);
				} else this.sg3.clear(1);	

				var strSQL = "select c.kode_barang,c.satuan,c.nama,sum(isnull(x.terjual,0)) as terjual  "+
							 "from ktu_barang c "+
							
							 "     left join ( "+

							 "			select bb.kode_barang,SUM(bb.jumlah+bb.bonus) as terjual "+
							 "			from ktu_nota_m a  "+
							 "				inner join brg_trans_d bb on a.no_bukti=bb.no_bukti and a.kode_lokasi=bb.kode_lokasi "+							 
							 "			where a.kode_kantin =  '"+this.cb_kantin.getText()+"' and a.tanggal = '"+this.dp_d1.getDateString()+"' and a.no_closing = '-' and a.nik_user = '"+this.cb_pic.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							 " 			group by bb.kode_barang "+

							 ") x on c.kode_barang=x.kode_barang "+		 											
							 "where c.kode_lokasi ='"+this.app._lokasi+"' "+
							 
							 "group by c.kode_barang,c.satuan,c.nama "+
							 "order by c.kode_barang";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line5;
					this.sg5.clear();
					for (var i in data.rs.rows){
						line5 = data.rs.rows[i];							
						this.sg5.appendData([line5.kode_barang,line5.nama,line5.satuan,floatToNilai(line5.terjual),"0","0"]); 
					}
				} else this.sg5.clear(1);			 

				
			} else system.alert(this,"Pilihan tidak valid.","PIC dan Kantin harus dipilih.");
		} catch(e){
			alert(e);
		}
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line2.no_bukti,line2.tanggal,line2.ket,floatToNilai(line2.nilai)]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line3;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line3 = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line3.status,floatToNilai(line3.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	
	doChangeCell5: function(sender, col, row){
		if (col == 4 && sender.cells(4,row) != "") {
			var sak =  nilaiToFloat(this.sg5.cells(4,row)) - nilaiToFloat(this.sg5.cells(3,row));
			this.sg5.cells(5,row,sak);
		}
	},


	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	

	doLoad:function(sender){						
			var strSQL = "select a.no_closing, a.tanggal, a.ket, a.total, b.kode_kantin+' | '+b.nama as kantin "+
						 "from ktu_closing_m a "+
						 "inner join ktu_kantin b on a.kode_kantin=b.kode_kantin and a.kode_lokasi=b.kode_lokasi "+
						 "where a.nik_user='"+this.app._userLog+"' and a.tanggal='"+this.dp_d2.getDateString()+"' and a.no_ba='-' ";					 			
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line.no_closing,line.tanggal,line.kantin,line.ket,floatToNilai(line.total)]); 							
			}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.dp_d1.setReadOnly(true);
				this.bTampil.hide();

				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));

				var strSQL = "select * from ktu_closing_m where no_closing ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d2.setText(line.tanggal);
						this.dp_d1.setText(line.tgl_nota);
						this.cb_pic.setText(line.pic);
						this.cb_kantin.setText(line.kode_kantin);
						this.e_ket.setText(line.ket);
					}
				}

				var strSQL = "select a.no_bukti, a.tanggal, a.ket, a.nilai "+
							 "from ktu_nota_m a "+ 						
							 "where a.no_closing = '"+this.e_nb.getText()+"' and a.nik_user = '"+this.cb_pic.getText()+"' ";		 							

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU4 = data;
					this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn4.rearrange();
					this.doTampilData4(1);

					var tot = 0;
					var tota = 0;
					var total = 0;
					
					var line;
					for (var i=0;i < this.dataJU4.rs.rows.length;i++){
						line = this.dataJU4.rs.rows[i];
						total+=parseFloat(line.nilai);
					}
			
					this.e_tot.setText(floatToNilai(total));	
				} else this.sg4.clear(1);	

				var strSQL = "select bb.kode_bayar as status,SUM(bb.nilai) as nilai "+
							 "from ktu_nota_m a  "+
							 "inner join ktu_nota_bayar bb on a.no_bukti=bb.no_bukti and a.kode_lokasi=bb.kode_lokasi "+
							 "where a.kode_kantin =  '"+this.cb_kantin.getText()+"' and a.tanggal = '"+this.dp_d1.getDateString()+
							 "' and a.no_closing =  '"+this.e_nb.getText()+"'  and a.nik_user = '"+this.cb_pic.getText()+"' group by bb.kode_bayar  ";		 							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU3 = data;
					this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn3.rearrange();
					this.doTampilData3(1);
				} else this.sg3.clear(1);	
				
				
				var data = this.dbLib.getDataProvider("select a.*,b.nama from ktu_closing_brg a inner join ktu_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi where a.no_closing='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line5;
					this.sg5.clear();
					for (var i in data.rs.rows){
						line5 = data.rs.rows[i];							
						this.sg5.appendData([line5.kode_barang,line5.nama,line5.satuan,floatToNilai(line5.jumlah),floatToNilai(line5.sawal),floatToNilai(line5.sakhir)]); 
					}
				} else this.sg5.clear(1);
				
				
			}
		} catch(e) {alert(e);}
	}
});
