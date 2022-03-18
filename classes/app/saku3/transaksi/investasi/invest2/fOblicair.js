window.app_saku3_transaksi_investasi_invest2_fOblicair = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fOblicair.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fOblicair";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencairan Kupon Obligasi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Progress","Catatan"],
					colWidth:[[4,3,2,1,0],[200,80,350,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_piukupon = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,200,20],caption:"Tot. PiuKupon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2 });
		this.e_akru = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,18,200,20],caption:"Tot. Akru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Jenis Obligasi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,19,200,20],caption:"Tot. Cair", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
	
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,302], childPage:["Data Akru Obligasi"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:12,tag:9,
		            colTitle:["No Beli","No Akru","Keterangan","Tgl Akru","Akun Piutang","Akun Pdpt","Kode DRK","Nominal","Jml Hari","Nilai Akru","Nilai Piutang","Nilai Cair"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,60,100,70,70,70,70,150,100,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[11]],					
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
					colFormat:[[7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('OBDRKSPI','PPINV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;	
					if (line.kode_spro == "OBDRKSPI") this.cb_drk.setText(line.flag);	
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fOblicair.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fOblicair.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0)  {
					
					
					}
					
					sql.add("insert into inv_oblicair_m(no_cair,kode_jenis,tanggal,keterangan,kode_curr,kurs,nilai_rev,nilai,nilai_piukupon,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input,no_app1,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_akru.getText())+","+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_piukupon.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','F','OBLCAIR','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate(),'-','0')");										
										
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(11,i) != "" && this.sg.cells(11,i) != "0"){							
							sql.add("insert into inv_oblicair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_jenis.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(5,i)+"','"+this.sg.cells(2,i)+"','D',"+nilaiToFloat(this.sg.cells(9,i))+",'"+this.kodepp+"','"+this.sg.cells(6,i)+"','"+this.app._lokasi+"','OBLCAIR','KUPONREV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
							sql.add("insert into inv_oblicair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_jenis.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','C',"+nilaiToFloat(this.sg.cells(9,i))+",'"+this.kodepp+"','"+this.sg.cells(6,i)+"','"+this.app._lokasi+"','OBLCAIR','PIUREV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");		
							
							sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
									"('"+this.e_nb.getText()+"','OBLCAIR','"+this.app._lokasi+"','"+this.sg.cells(5,i)+"','"+this.kodepp+"','"+this.sg.cells(6,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.sg.cells(9,i))+")");												
							
 							sql.add("update inv_obliakru_d set no_cair='"+this.e_nb.getText()+"',nilai_cair="+nilaiToFloat(this.sg.cells(11,i))+" where kode_jenis='"+this.cb_jenis.getText()+"' and no_beli='"+this.sg.cells(0,i)+"' and no_akru='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
																				
							if (this.sg.cells(10,i) != "0") sql.add("update inv_obli_d set tgl_akru_kupon='"+this.dp_d1.getDateString()+"', no_cair_piukupon='"+this.e_nb.getText()+"' where no_beli='"+this.sg.cells(0,i)+"' and kode_jenis='"+this.cb_jenis.getText()+"' and no_beli='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							else sql.add("update inv_obli_d set tgl_akru_kupon='"+this.dp_d1.getDateString()+"' where no_beli='"+this.sg.cells(0,i)+"' and kode_jenis='"+this.cb_jenis.getText()+"' and no_beli='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;		
				
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		this.cb_jenis.setSQL("select distinct a.kode_jenis, a.nama from inv_oblijenis a inner join inv_obli_d b on a.kode_jenis=b.kode_jenis ",["kode_jenis","nama"],false,["Jenis","Nama"],"and","Daftar Jens Obligasi",true);
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);			
			this.sg.clear(1); 
			this.e_akru.setText("0");	
			this.e_nilai.setText("0");
		}
		if (sender == this.cb_jenis && this.cb_jenis.getText()!="") {			
			var strSQL = "select a.no_beli,a.no_akru,b.keterangan,convert(varchar,a.tgl_akhir,103) as tgl_akhir,a.akun_piukupon,a.akun_kupon,a.kode_drk,a.jml_hari,a.nilai,c.nilai as nominal, "+						 
			             "case when c.no_cair_piukupon='-' then nilai_piukupon else 0 end as nilai_piukupon "+
						 "from inv_obliakru_d a inner join inv_obliakru_m b on a.no_akru=b.no_akru and a.kode_lokasi=b.kode_lokasi "+
						 "                      inner join inv_obli_d c on a.no_beli=c.no_beli and a.kode_jenis=c.kode_jenis "+
						 "where a.kode_jenis='"+this.cb_jenis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_cair='-'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					this.sg.appendData([line.no_beli,line.no_akru,line.keterangan,line.tgl_akhir,line.akun_piukupon,line.akun_kupon,line.kode_drk,floatToNilai(line.nominal),floatToNilai(line.jml_hari),floatToNilai(line.nilai),floatToNilai(line.nilai_piukupon),"0"]);
				}
			} else this.sg.clear(1);						
			
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)){
					for (var j=i;j < this.sg.getRowCount();j++){
						if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							this.sg.cells(10,j,"0");
						}
					}
				}
			}
				
				
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg2.clear(1); 
				this.sg3.clear(1);			
				this.bTampil.show();
				this.bUpload.show();
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_oblicair_m","no_cair",this.app._lokasi+"-OBCA"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
	},		
	doChangeCell: function(sender, col, row){
		if (col == 11) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{						
			var akru = cair = piu = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != "" && this.sg.cells(11,i) != ""){
					akru += nilaiToFloat(this.sg.cells(9,i));				
					cair += nilaiToFloat(this.sg.cells(11,i));									
					piu += nilaiToFloat(this.sg.cells(10,i));									
				}
			}
			this.e_akru.setText(floatToNilai(akru));
			this.e_nilai.setText(floatToNilai(cair));			
			this.e_piukupon.setText(floatToNilai(piu));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;								
								this.pc2.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);																				
			this.sg.clear(1);
			this.sg3.clear(1);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	}
});