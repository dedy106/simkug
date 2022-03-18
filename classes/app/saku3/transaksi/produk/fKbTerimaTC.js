window.app_saku3_transaksi_produk_fKbTerimaTC = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fKbTerimaTC.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fKbTerimaTC";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan TCASH", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"], visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,120,20],caption:"Tanggal", underline:true});	
		this.dp_d1 = new portalui_datePicker(this,{bound:[140,11,100,20],selectDate:[this,"doSelectDate"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data TCASH","Daftar TCASH"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["No. Bukti","Keterangan"],
					colWidth:[[1,0],[300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Bukti",maxLength:10,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});												
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"keterangan", maxLength:50, tag:1});
		this.cb_kb = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Akun Kas Bank", maxLength:50, tag:1, multiSelection:false});	
	
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,15,995,327], childPage:["Data Penerimaan Tcash"]});				
		this.sg4 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:2,
					colTitle:["ID TCash","Nilai"],
					colWidth:[[1,0],[150,200]],
					colFormat:[[1],[cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager1"]});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.doLoad();

			this.cb_kb.setSQL("select kode_akun, nama from masakun ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun Kas Bank",true);

			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro ='TTCASH' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																	
				this.akun_titipan = line.flag;							
			}
			else alert("Kode Titipan Belum Ada");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fKbTerimaTC.extend(window.childForm);
window.app_saku3_transaksi_produk_fKbTerimaTC.implement({
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
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn4.setTotalPage(sender.getTotalPage());
			this.sgn4.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg4.doSelectPage(page);
	},
	simpan: function(){			
		try{				
			if (this.stsSimpan == 1) this.doClick(this.i_gen);		
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if(this.stsSimpan == 0){
						sql.add("delete from ktu_tcash_t where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from ktu_tcash_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								sql.add("insert into ktu_tcash_d(no_bukti,id_tcash,nilai,kode_lokasi,no_rekon,nilai_selisih) values "+
										"('"+this.e_nb.getText()+"','"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(1,i))+",'"+this.app._lokasi+"','-',0)");
							}
						}						
					}

					sql.add("insert into ktu_tcash_t(no_bukti,tanggal,tgl_input,ket,kb,kode_lokasi) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',getdate(),'"+this.e_ket.getText()+"','"+this.cb_kb.getText()+"','"+this.app._lokasi+"')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_kb.getText()+"','D',sum(a.nilai),sum(a.nilai),'Penerimaan Piutang TCASH','KB','PIU-B','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-' "+
							"from ktu_tcash_d a "+
							"where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akun_titipan+"','C',sum(a.nilai),sum(a.nilai),'Penerimaan Piutang TCASH','KB','PIU-B','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-' "+
							"from ktu_tcash_d a "+
							"where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into trans_m(no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3, param1,param2,param3) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','TTCASH','F','-','-','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,sum(a.nilai),0,0,'-','-','-','-','-','-', '-','-','-' "+
							"from ktu_tcash_d a "+
							"where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ktu_tcash_t","no_bukti",this.app._lokasi+"-TT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.stsSimpan=1;	
			setTipeButton(tbSimpan);
			this.e_ket.setFocus();	
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.stsSimpan=1;
				this.doClick(this.i_gen);
				this.sg4.clear(1);
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;				
			case "hapus" :
				this.preView = "0";
				break;				
		}
	},
		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},

	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},

	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.stsSimpan=1;
			this.doClick(this.i_gen);			
			setTipeButton(tbSimpan);
			this.sg4.clear(1);
		} catch(e) {
			alert(e);
		}
	},

	doLoad:function(sender){						
		var strSQL = "select no_bukti,ket from ktu_tcash_t where kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},

	doTampilData: function(page) {
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bukti,line.ket]); 
		}
		this.sg1.setNoUrut(start);
	},

	doPager: function(sender, page){
		this.doTampilData(page);
	},

	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));
				this.e_ket.setText(this.sg1.cells(1,row));

				var strSQL = "select * from ktu_tcash_t where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.dp_d1.setText(line.tgl_nota);
						this.cb_kb.setText(line.kb);
					}
				}
				var strSQL = "select id_tcash, nilai from ktu_tcash_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";		 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.id_tcash,floatToNilai(line.nilai)]);
					}
				}				
			}
		} catch(e) {alert(e);}
	}
});
