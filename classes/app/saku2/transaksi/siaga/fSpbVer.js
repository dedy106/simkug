window.app_saku2_transaksi_siaga_fSpbVer = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fSpbVer.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fSpbVer";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi SPB : Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Verifikasi",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_spb = new saiCBBL(this,{bound:[20,17,220,20],caption:"No SPB", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_npko = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"NPKO", readOnly:true});
		this.e_curr = new saiLabelEdit(this,{bound:[20,13,145,20],caption:"Curr NPKO", readOnly:true});				
		this.e_kurs = new saiLabelEdit(this,{bound:[170,13,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1"});		
		this.e_total = new saiLabelEdit(this,{bound:[700,13,220,20],caption:"Nilai SPB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
				
		this.pc1 = new pageControl(this,{bound:[20,18,900,300], childPage:["Data Item Akun SPB","Akun Verifikasi"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,170,80,150,80,200,80]],					
					readOnly :true,colFormat:[[6],[cfNilai]],										
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Keterangan","DC","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,50,200,150,80,150,80,150,80]],
					columnReadOnly:[true,[1,3,5],[0,2,3,4,6,7,8]],
					colFormat:[[8],[cfNilai]],
					picklist:[[7],[new portalui_arrayMap({items:["D","C"]})]],
					buttonStyle:[[0,2,4,7],[bsEllips,bsEllips,bsEllips,bsAuto]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
						
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);							
			this.e_curr.setText("IDR");
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fSpbVer.extend(window.childForm);
window.app_saku2_transaksi_siaga_fSpbVer.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_spbver_m","no_ver",this.app._lokasi+"-VSPB"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("insert into gr_spbver_m (no_ver,tanggal,kode_lokasi,periode,keterangan,nik_buat,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.app._userLog+"',getdate())");
					sql.add("update gr_spb_m set nilai="+parseNilai(this.e_total.getText())+",no_ver='"+this.e_nb.getText()+"' where no_spb='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								var nilai = Math.round(nilaiToFloat(this.sg2.cells(8,i)) * nilaiToFloat(this.e_kurs.getText()));
								sql.add("insert into gr_spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nilai_curr,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.cb_spb.getText()+"','"+this.e_npko.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(6,i)+"','"+this.sg2.cells(7,i)+"',"+nilai+",'"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.app._lokasi+"','SPB','VER','"+this.e_periode.getText()+"',"+parseNilai(this.sg2.cells(8,i))+",'"+this.e_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate())");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1); this.e_curr.setText("IDR"); this.e_kurs.setText("1"); 										
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				for (var i=0;i < this.sg2.getRowCount();i++){					
					if (!this.sg2.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg2.getColCount();j++){
							if (this.sg2.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg2.validasi();								
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai SPB tidak boleh nol atau kurang.");
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
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");		
	},
	doChange:function(sender){
		if (sender == this.e_periode ) {
			if (this.e_periode.getText()!="") {
				var strSQL = "select no_spb, keterangan from gr_spb_m where no_ver='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				this.cb_spb.setSQL(strSQL,["no_spb","keterangan"],false,["No SPB","Uraian"],"and","Data SPB",true);			
			}
		}		
		if (sender == this.cb_spb && this.cb_spb.getText()!="") {
			var strSQL = "select a.kode_akun,a.kode_pp,a.kode_drk,a.nilai_curr,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,a.kode_curr,a.kurs,a.no_dokumen "+
					     "from  gr_spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "				   inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						 "where a.no_spb='"+this.cb_spb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.nilai_curr)]);
				}				
			} else this.sg.clear(1);			
			this.e_curr.setText(line.kode_curr);
			this.e_kurs.setText(floatToNilai(line.kurs));
			this.e_npko.setText(line.no_dokumen);
			this.sg2.validasi();
		}			
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_spbver_m","no_ver",this.app._lokasi+"-VSPB"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
	},
	doChangeCell: function(sender, col, row){	
		if ((col == 7 || col == 8) && (this.sg2.cells(8,row) != "")) this.sg2.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg2.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
				//sender.cells(4,row,"");
				//sender.cells(5,row,"");
			}
		}
		if (col == 2) {
			if (this.sg2.cells(2,row) != "") {
				var pp = this.dataPP.get(sender.cells(2,row));
				if (pp) sender.cells(3,row,pp);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode PP "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}
				//sender.cells(4,row,"");
				//sender.cells(5,row,"");
			}
		}
		if (col == 4) {
			if (this.sg2.cells(4,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg2.cells(0,row)+"' and b.kode_pp = '"+this.sg2.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg2.cells(0,row)+"' and b.kode_pp = '"+this.sg2.cells(2,row)+"' and b.kode_drk = '"+this.sg2.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg2.cells(5,row,line.nama);
					else {
						if (!isAda) this.sg2.cells(5,row,"-");
						else {
							this.sg2.cells(4,row,"");
							this.sg2.cells(5,row,"");
						}
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{			
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != ""){
					tot += nilaiToFloat(this.sg.cells(6,i));															
				}
			}
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(8,i) != ""){
					if (this.sg2.cells(7,i)=="D") tot += nilaiToFloat(this.sg2.cells(8,i));	
					if (this.sg2.cells(7,i)=="C") tot -= nilaiToFloat(this.sg2.cells(8,i));	
				}
			}
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 4){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg2.cells(0,row)+"' and b.kode_pp = '"+this.sg2.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg2.cells(0,row)+"' and b.kode_pp = '"+this.sg2.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg2.cells(0,row)+"' and b.kode_pp = '"+this.sg2.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();
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
				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); this.e_curr.setText("IDR"); this.e_kurs.setText("1");
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});