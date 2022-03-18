window.app_saku3_transaksi_sinergi_fSpbMitra = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sinergi_fSpbMitra.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sinergi_fSpbMitra";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPB Hutang", 0);	
				
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Transaksi","List Order"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:3,tag:9,
		            colTitle:["No SPB","Tanggal","No PO"],
					colWidth:[[2,1,0],[180,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No SPB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_fp = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,225,20],caption:"Faktur Pajak No.", maxLength:50});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Approved By",multiSelection:false,tag:2});		
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"PPN 10%", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,12,150,20],caption:"Currency - Kurs",items:["IDR","USD"], readOnly:true,tag:2,change:[this,"doChange"]});	
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[175,12,45,20],caption:"", tag:3, labelWidth:0, readOnly:true, tipeText:ttNilai, text:"1",tag:2});								
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Total+", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,13,990,315], childPage:["Referensi","Data Item Order"]});		
		this.cb_vendor = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Supplier",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.cb_po = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"No PO",multiSelection:false,tag:1,change:[this,"doChange"]});		
				
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["Nama Barang","Kode Barang","Satuan","Price","Quantity","Total"],					
					colWidth:[[5,4,3,2,1,0],[100,100,80,80,150,400]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],					
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_vendor.setSQL("select kode_vendor, nama from si_vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Supplier",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			this.c_curr.setText("IDR");
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('SIHUT','SIPPNM','SIHPP') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "SIPPNM") this.akunPPN = line.flag;								
					if (line.kode_spro == "SIHUT") this.akunHutang = line.flag;			
					if (line.kode_spro == "SIHPP") this.akunHpp = line.flag;								
				}
			}			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sinergi_fSpbMitra.extend(window.portalui_childForm);
window.app_saku3_transaksi_sinergi_fSpbMitra.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if (this.stsSimpan == 1) this.doClick();					
					if (this.stsSimpan == 0) {
						sql.add("delete from si_spb_m where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from si_spb_j where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into si_spb_m(no_spb,kode_lokasi,nik_user,tgl_input,periode,posted,kode_pp,tanggal,no_dokumen,no_fp,nik_app,keterangan,kode_vendor,kode_curr,kurs,nilai,ppn,akun_hutang) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"','F','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.cb_po.getText()+"','"+this.e_fp.getText()+"','"+this.cb_app.getText()+"','Akru PO No : "+this.cb_po.getText()+"','"+this.cb_vendor.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.akunHutang+"')");
												
					var totalIDR = Math.round(nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText()));
					var hppIDR = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_kurs.getText()));
					var ppnIDR = Math.round(nilaiToFloat(this.e_ppn.getText()) * nilaiToFloat(this.e_kurs.getText()));
					
					sql.add("insert into si_spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_po.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunHutang+"','Akru Hutang PO No: "+this.e_nb.getText()+"','C',"+totalIDR+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PO','HUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_total.getText())+")");
					sql.add("insert into si_spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_po.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunHpp+"','Akru HPP PO No: "+this.e_nb.getText()+"','D',"+hppIDR+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PO','HPP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_nilai.getText())+")");
					sql.add("insert into si_spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_po.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunPPN+"','Akru PPN Invoice No: "+this.e_nb.getText()+"','D',"+ppnIDR+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PO','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_ppn.getText())+")");
							
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);			
					setTipeButton(tbAllFalse);					
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
			    for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(1,j) == this.sg.cells(1,i) && (i != j)) {
							    var k = j+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
					sql.add("delete from si_spb_m where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from si_spb_j where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}				
				break;									
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);
				this.cb_vendor.setSQL("select kode_vendor, nama from si_vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Supplier",true);				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"si_spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_fp.setFocus();
			setTipeButton(tbSimpan);			
							
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){
		if (sender == this.cb_vendor && this.cb_vendor.getText() != "" && this.stsSimpan==1) {
			this.cb_po.setSQL("select a.no_po, a.no_dokumen from si_po_m a left join si_spb_m b on a.no_po=b.no_dokumen and a.kode_lokasi=b.kode_lokasi "+
			                  "where b.no_dokumen is null and a.kode_vendor ='"+this.cb_vendor.getText()+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",["a.no_po","a.no_dokumen"],false,["No PO","No Dokumen"],"and","Data PO",true);				
		}
		if (sender == this.cb_po && this.cb_po.getText() != "") {			
			var data = this.dbLib.getDataProvider("select b.kode_barang,b.nama,a.sat_beli,a.jml_beli,a.h_beli,round(a.jml_beli*a.h_beli,2)  as total "+
						"from si_so_d a inner join si_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+						
						"where a.no_po = '"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg.appendData([line.nama,line.kode_barang,line.sat_beli,floatToNilai(line.h_beli),floatToNilai(line.jml_beli),floatToNilai(line.total)]);
				}
			} else this.sg.clear(1);							
		}
		if (sender == this.c_curr ) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); 
				this.e_kurs.setText("1"); 			
			}
			else {
				this.e_kurs.setReadOnly(false); 
				this.e_kurs.setText("0"); 			
			}			
		}
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){
					tot += nilaiToFloat(this.sg.cells(5,i));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));	
			this.e_ppn.setText(floatToNilai(Math.round(tot * 0.1 *100)/100));	
			this.e_total.setText(floatToNilai(tot+nilaiToFloat(this.e_ppn.getText())));	
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
								this.nama_report="server_report_saku3_klinik_rptBeli";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_beli='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/"+this.app._lokasi;
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
				this.pc2.show();   
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
			this.sg.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.doClick();								
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_spb,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen "+
		             "from si_spb_m a left join (select distinct no_spb,kode_lokasi from si_spbbayar_d where kode_lokasi='"+this.app._lokasi+"') b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi "+
					 "where b.no_spb is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_spb,line.tgl,line.no_dokumen]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * "+
							 "from si_spb_m "+							 
							 "where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);
						this.e_fp.setText(line.no_fp);																	
						this.cb_app.setText(line.nik_app);																	
						this.c_curr.setText(line.kode_curr);																	
						this.e_kurs.setText(floatToNilai(line.kurs));																	
						this.cb_po.setSQL("select no_po, no_dokumen from si_po_m where no_po='"+line.no_dokumen+"' and kode_lokasi='"+this.app._lokasi+"'",["no_po","no_dokumen"],false,["No PO","No Dok"],"and","Data PO",true);									
						this.cb_vendor.setSQL("select kode_vendor, nama from si_vendor where kode_vendor='"+line.kode_vendor+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Supplier",true);									
						this.cb_vendor.setText(line.kode_vendor);												
						this.cb_po.setText(line.no_dokumen);	
					}
				}												
				
			}									
		} catch(e) {alert(e);}
	}
});