window.app_saku3_transaksi_investasi_invest2_fSahamRev = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fSahamRev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fSahamRev";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reverse Stock", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Progress","Catatan"],
					colWidth:[[4,3,2,1,0],[200,80,350,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});								
		this.cb_saham = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Saham", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_bagi = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Jml Pembagi", tipeText:ttNilai, text:"1",tag:2});
		this.bTampil = new button(this.pc2.childPage[0],{bound:[230,17,80,18],caption:"Data Saham",click:[this,"doTampil"]});			
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,200,20],caption:"Total Lbr", tipeText:ttNilai, text:"0", readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,302], childPage:["Data Saham","Rekap Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:9,tag:0,				
				colTitle:["Kelola","Nama","Kd Saham","Nama Saham","Harga Oleh","Harga Buku","Lbr Awal","Lbr Kurang","Lbr Akhir"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[90,90,90,100,100,150,80,150,60]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
				colFormat:[[4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
				nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9, 
		            colTitle:["Saham","Jml Lbr"],
					colWidth:[[1,0],[100,80]],
					colFormat:[[1],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
					
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
									
			this.cb_saham.setSQL("select kode_saham, nama from inv_saham where flag_aktif='1'",["kode_saham","nama"],false,["Kode","Nama"],"where","Daftar Saham",true);						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPINV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;													
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fSahamRev.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fSahamRev.implement({
	doTampil : function() {		
		if (this.cb_saham.getText() != "") {
			this.nik_user=this.app._nikUser;						
			var strSql = "call sp_saham_tmp ('"+this.e_periode.getText()+"','"+this.nik_user+"')";					
			this.dbLib.execQuerySync(strSql);	
									
			var strSQL = "select a.kode_kelola,b.nama as nama_kelola,a.kode_saham,c.nama as nama_saham,a.jumlah,a.h_oleh,a.h_buku,a.jumlah - round(a.jumlah / "+nilaiToFloat(this.e_bagi.getText())+",0) as kurang, round(a.jumlah / "+nilaiToFloat(this.e_bagi.getText())+",0) as lbr_akhir "+
						 "from inv_saham_tmp a inner join inv_kelola b on a.kode_kelola=b.kode_kelola  and b.flag_aktif='1' "+
						 "                     inner join inv_saham c on a.kode_saham=c.kode_saham "+
						 "where a.kode_saham='"+this.cb_saham.getText()+"' and a.nik_user='"+this.nik_user+"' order by a.kode_kelola";
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg.appendData([line1.kode_kelola,line1.nama_kelola,line1.kode_saham,line1.nama_saham,floatToNilai(line1.h_oleh),floatToNilai(line1.h_buku),floatToNilai(line1.jumlah),floatToNilai(line1.kurang),floatToNilai(line1.lbr_akhir)]);
				}
			} else this.sg.clear(1);							
			this.sg.validasi();
		}
		else system.alert(this,"Data Saham tidak valid.","Data saham harus terisi.");		
	},
	doRekap : function() {
		this.sg2.clear();
		var jumlah = nilai = 0;
		for (var i=0;i < this.sg.rows.getLength();i++){						
			if (this.sg.rowValid(i)) {
				jumlah = nilaiToFloat(this.sg.cells(8,i));				
				var isAda = false;
				var idx = totaljml = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),floatToNilai(jumlah)]);
				} 
				else { 
					totaljml = nilaiToFloat(this.sg2.cells(1,idx));
					totaljml = totaljml + jumlah;
					this.sg2.setCell(1,idx,totaljml);					
				}								
			}
		}	
	},
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
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_shmjual_m where no_shmjual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_shmjual_d where no_shmjual='"+this.e_nb.getText()+"' ");						
					}
					
					//jual_m progress=1; no_app1='SAP'---> modul pindah ke sap
					sql.add("insert into inv_shmjual_m(no_shmjual,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kasjual,nik_buat,no_dokumen,keterangan,kode_drk,kode_kelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,akun_piutang,akun_piugl,nilai_piutang,nilai_piugl,modul,kode_pp,no_app1,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','-','"+this.app._userLog+"',  '-','"+this.e_ket.getText()+"','-','"+this.cb_saham.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_bagi.getText())+",0,0,0,'-','-',0,0,'SHMREV','"+this.kodepp+"','SAP','1')");
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(7,i) != "" && this.sg.cells(7,i) != "0"){							
							sql.add("insert into inv_shmjual_d (no_shmjual,kode_kelola,kode_saham,h_oleh,h_buku,h_jual,jumlah,n_jual,gainlos, komisi,vat,levi,pph,kode_broker) values "+
								    "('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+",0,0,"+nilaiToFloat(this.sg.cells(7,i))+",0,0, 0,0,0,0,'-')");
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
					this.sg3.clear(1);
					this.sg2.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);			
				break;
			case "simpan" :	
			case "ubah" :	
				this.doRekap();					
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
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
					sql.add("delete from inv_shmjual_m where no_shmjual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shmjual_d where no_shmjual='"+this.e_nb.getText()+"' ");						
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
	},
	doChange:function(sender){		
		if (sender == this.cb_saham && this.cb_saham.getText()!="") {			
			if (this.stsSimpan == 1) {
				this.sg.clear(1);
				this.sg2.clear(1);
			}
		}		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg2.clear(1); 
				this.sg3.clear(1);			
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_shmjual_m","no_shmjual",this.app._lokasi+"-REV"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}		
	},		
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){
					tot += nilaiToFloat(this.sg.cells(8,i));					
				}
			}			
			this.e_total.setText(floatToNilai(tot));									
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
			this.sg2.clear(1);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select a.no_shmjual,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.progress,b.catatan "+
		             "from inv_shmjual_m a "+
					 "     left join inv_app2_m b on a.no_app1=b.no_app  and b.no_flag='-' and b.form='APPMAN' "+					 
					 "where a.progress in ('0','M') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='SHMREV'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			this.page=1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_shmjual,line.tgl,line.keterangan,line.progress,line.catatan]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);								
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_shmjual_m where no_shmjual= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.e_bagi.setText(floatToNilai(line.nilai_komisi));						
						this.cb_saham.setText(line.kode_kelola);						
					}
				}
				
				this.nik_user=this.app._nikUser;						
				var sql = "call sp_saham_tmp_edit ('"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";			
				this.dbLib.execQuerySync(sql);	
				
				var strSQL = "select a.kode_kelola,b.nama as nama_kelola,a.kode_saham,c.nama as nama_saham,a.jumlah,a.h_oleh,a.h_buku,a.jumlah - round(a.jumlah * "+nilaiToFloat(this.e_bagi.getText())+",0) as kurang, round(a.jumlah * "+nilaiToFloat(this.e_bagi.getText())+",0) as lbr_akhir "+
							 "from inv_saham_tmp a inner join inv_kelola b on a.kode_kelola=b.kode_kelola  "+
							 "                     inner join inv_saham c on a.kode_saham=c.kode_saham "+
							 "					   inner join inv_shmjual_d d on a.kode_kelola=d.kode_kelola and a.kode_saham=d.kode_saham "+
							 "where d.no_shmjual='"+this.e_nb.getText()+"' and a.nik_user='"+this.nik_user+"' order by a.kode_kelola";
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.kode_kelola,line1.nama_kelola,line1.kode_saham,line1.nama_saham,floatToNilai(line1.h_oleh),floatToNilai(line1.h_buku),floatToNilai(line1.jumlah),floatToNilai(line1.kurang),floatToNilai(line1.lbr_akhir)]);
					}
				} else this.sg.clear(1);							
				this.sg.validasi();
				
				this.doRekap();
			}
		} catch(e) {alert(e);}
	}	
});