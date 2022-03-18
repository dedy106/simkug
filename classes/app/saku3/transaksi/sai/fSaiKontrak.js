window.app_saku3_transaksi_sai_fSaiKontrak = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sai_fSaiKontrak.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sai_fSaiKontrak";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Kontrak Sewa: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Kontrak","Daftar Kontrak"]});
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["ID Kontrak","No Dokumen","Kode","Nama Cust","Nilai","Tgl Mulai","Tgl Selesai"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,100,250,60,200,100]],
					colFormat:[[4],[cfNilai]],																	
					readOnly:true,
					dblClick:[this,"doDoubleClick2"],autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});
		this.bLoad2 = new portalui_imageButton(this.sgn2,{bound:[this.sgn2.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad2"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"ID Kontrak",readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,500,20],caption:"No Dokumen", maxLength:100});				
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,500,20],caption:"Keterangan", maxLength:200});				
		this.cb_produk = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Produk",multiSelection:false,tag:1});
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Customer",multiSelection:false,tag:1});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,15,200,20],caption:"Nilai", tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]});			
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,100,18],selectDate:[this,"doChange"]}); 		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,11,200,20],caption:"Nilai PPN",  tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,12,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,12,100,18]}); 				
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,12,200,20],caption:"Total Tagihan",  tipeText:ttNilai, text:"0", readOnly:true});		
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,20,990,255], childPage:["Data Modul"]});		
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:0,
				colTitle:["Deskripsi Modul","Nilai"],
				colWidth:[[1,0],[100,400]],								
				colFormat:[[1],[cfNilai]],
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);				
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.stsSimpan = 1;
			this.cb_cust.setSQL("select kode_cust, nama from sai_cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);											
			this.cb_produk.setSQL("select kode_produk, nama from sai_produk where kode_lokasi = '"+this.app._lokasi+"'",["kode_produk","nama"],false,["Kode","Nama"],"and","Data Produk",true);
			this.doClick();		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sai_fSaiKontrak.extend(window.portalui_childForm);
window.app_saku3_transaksi_sai_fSaiKontrak.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from sai_kontrak_m where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sai_kontrak_d where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					var perAwal = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					var perAkhir = this.dp_d2.getDateString().substr(0,4) + this.dp_d2.getDateString().substr(5,2);
					sql.add("insert into sai_kontrak_m(no_kontrak,kode_lokasi,nik_user,tgl_input,tgl_awal,tgl_akhir,no_dok,kode_cust,keterangan,nilai,nilai_ppn,per_awal,per_akhir,per_tagih,kode_produk) values "+
						   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_dok.getText()+"','"+this.cb_cust.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+perAwal+"','"+perAkhir+"','"+perAwal+"','"+this.cb_produk.getText()+"')");
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){
							sql.add("insert into sai_kontrak_d (no_kontrak,kode_lokasi,nu,keterangan,nilai) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.cells(0,i)+"','"+nilaiToFloat(this.sg1.cells(1,i))+"')");
						}
					}
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);							
					this.sg2.clear(1);
					this.sg1.clear(1);
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
			case "ubah" :	
			    this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();					
				sql.add("delete from sai_kontrak_m where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("delete from sai_kontrak_d where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},	
	doClick:function(sender){		
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);				
			this.cb_cust.setSQL("select kode_cust, nama from sai_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);					
		}
		this.stsSimpan = 1;					
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sai_kontrak_m","no_kontrak",this.app._lokasi+"-SAI.","00000"));
		this.e_dok.setFocus();		
		setTipeButton(tbSimpan);
	},		
	doChange:function(sender){
		if (sender == this.e_nilai && this.e_nilai.getText()!=""){
			this.e_ppn.setText(floatToNilai(Math.abs(nilaiToFloat(this.e_nilai.getText())*0.1)));
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
		}
		if (sender == this.e_ppn && this.e_ppn.getText()!=""){
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
		}		
		if (sender == this.dp_d1) {
			var strSQL = "select dateadd(month,12,'"+this.dp_d1.getDateString()+"') as tgl ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.dp_d2.setText(line.tgl);						
				}					
			}
		}
	},	
	doNilaiChange1: function(){
		try{			
			var saldo = 0;			
			for (var i = 0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(1,i) != "") {
					saldo += nilaiToFloat(this.sg1.cells(1,i));
				}
			}			
			this.e_nilai.setText(floatToNilai(Math.round(saldo * 100)/100));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},						
	doChangeCell1: function(sender, col, row){						
		if (col == 1) {				
			this.sg1.validasi();
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
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
	doLoad2:function(sender){																		
		var strSQL = "select a.no_kontrak,a.no_dok,a.kode_cust,b.nama,a.nilai,convert(varchar,tgl_awal,103) as tgl_awal,convert(varchar,tgl_akhir,103) as tgl_akhir "+
		             "from sai_kontrak_m a inner join sai_cust b on a.kode_cust = b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn2.rearrange();
			this.doTampilData2(1);
		} else this.sg2.clear(1);			
	},
	doTampilData2: function(page) {
		this.sg2.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];																
			this.sg2.appendData([line.no_kontrak,line.no_dok,line.kode_cust,line.nama,floatToNilai(line.nilai),line.tgl_awal,line.tgl_akhir]); 
		}
		this.sg2.setNoUrut(start);
	},
	doPager2: function(sender, page) {
		this.doTampilData2(page);
	},
	doDoubleClick2: function(sender, col , row) {
		try{
			if (this.sg2.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg2.cells(0,row));
								
				var strSQL = "select * from sai_kontrak_m where no_kontrak = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tgl_awal);
						this.dp_d2.setText(line.tgl_akhir);
						this.e_dok.setText(line.no_dok);
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						this.cb_produk.setText(line.kode_produk);						
						this.cb_cust.setSQL("select kode_cust, nama from sai_cust where kode_cust='"+line.kode_cust+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);									
						this.cb_cust.setText(line.kode_cust);						
					}
				}
				
				var strSQL = "select keterangan,nilai "+
							 "from sai_kontrak_d "+
							 "where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.keterangan,floatToNilai(line.nilai)]);
					}
				}				
				this.sg1.validasi();								
			}						
		} catch(e) {alert(e);}
	}
	
});