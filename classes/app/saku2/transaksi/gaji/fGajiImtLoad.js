window.app_saku2_transaksi_gaji_fGajiImtLoad = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fGajiImtLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gaji_fGajiImtLoad";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Gaji IMT: Load", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_total = new saiLabelEdit(this,{bound:[700,16,220,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bHitung = new button(this,{bound:[505,16,80,18],caption:"Validasi",click:[this,"doHitung"]});
		this.bUpload = new portalui_uploader(this,{bound:[600,16,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,370], childPage:["Data Gaji","Pesan Kesalahan"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:12,tag:0,
		            colTitle:["NIK","NAMA", "GDAS","TDAS","TSTR","TDAP","RAPL","IDAP","PPLN","PKOS","PCTR","PGIA"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,80,80,80,200,80]],					
					readOnly:true,colFormat:[[2,3,4,5,6,7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg, pager:[this,"selectPage"]});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,10,600,280],labelWidth:0,tag:9,readOnly:true});
		
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
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
				
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");													
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gaji_fGajiImtLoad.extend(window.childForm);
window.app_saku2_transaksi_gaji_fGajiImtLoad.implement({	
	doAfterUpload: function(sender, result, data){		
	    try{   		
			this.e_total.setText("0");
			this.stsTampil = "LOAD";
			this.dataUpload = data;
			if (result) {								
				this.sg.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		if (this.stsTampil == "LOAD") {
			var start = (page - 1) * 20;
			var finish = start + 20;
			finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
			this.sg.clear();
			for (var i=start; i < finish;i++){
				line = this.dataUpload.rows[i];			
				this.sg.appendData([line.nik,line.nama,floatToNilai(line.gdas),floatToNilai(line.tdas),floatToNilai(line.tstr),floatToNilai(line.tdap),floatToNilai(line.rapl),floatToNilai(line.idap),floatToNilai(line.ppln),floatToNilai(line.pkos),floatToNilai(line.pctr),floatToNilai(line.pgia)]);
			}
			this.sg.setNoUrut(start);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else {
			this.sg.clear();
			var line;
			this.page = page;
			var start = (page - 1) * 20;
			var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
			for (var i=start;i<finish;i++){
				line = this.dataJU.rs.rows[i];							
				this.sg.appendData([line.nik,line.nama,floatToNilai(line.gdas),floatToNilai(line.tdas),floatToNilai(line.tstr),floatToNilai(line.tdap),floatToNilai(line.rapl),floatToNilai(line.idap),floatToNilai(line.ppln),floatToNilai(line.pkos),floatToNilai(line.pctr),floatToNilai(line.pgia)]);
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
			this.stsSimpan = "1";
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into hr_gaji_m(no_gaji,kode_lokasi,tanggal,periode,tgl_transfer,keterangan,nik_buat,tgl_input,nik_user,flag_penilaian,pesan) values "+
							"('"+this.e_nb.getText()+"','"+this.app.lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','-','-')");
															
					sql.add("insert into hr_gaji_d(no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir)  "+
							" select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nik,'"+this.e_periode.getText()+"','GDAS',b.kode_loker,c.kode_akun,a.gdas,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01',dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) "+
							" from hr_gaji_tmp a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join hr_gaji_param c on c.kode_param='GDAS' and c.kode_lokasi='"+this.app._lokasi+"' "+
							" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'");
					sql.add("insert into hr_gaji_d(no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir)  "+
							" select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nik,'"+this.e_periode.getText()+"','TDAS',b.kode_loker,c.kode_akun,a.gdas,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01',dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) "+
							" from hr_gaji_tmp a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join hr_gaji_param c on c.kode_param='TDAS' and c.kode_lokasi='"+this.app._lokasi+"' "+
							" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'");
					sql.add("insert into hr_gaji_d(no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir)  "+
							" select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nik,'"+this.e_periode.getText()+"','TSTR',b.kode_loker,c.kode_akun,a.gdas,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01',dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) "+
							" from hr_gaji_tmp a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join hr_gaji_param c on c.kode_param='TSTR' and c.kode_lokasi='"+this.app._lokasi+"' "+
							" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'");
					sql.add("insert into hr_gaji_d(no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir)  "+
							" select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nik,'"+this.e_periode.getText()+"','TDAP',b.kode_loker,c.kode_akun,a.gdas,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01',dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) "+
							" from hr_gaji_tmp a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join hr_gaji_param c on c.kode_param='TDAP' and c.kode_lokasi='"+this.app._lokasi+"' "+
							" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'");
					sql.add("insert into hr_gaji_d(no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir)  "+
							" select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nik,'"+this.e_periode.getText()+"','RAPL',b.kode_loker,c.kode_akun,a.gdas,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01',dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) "+
							" from hr_gaji_tmp a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join hr_gaji_param c on c.kode_param='RAPL' and c.kode_lokasi='"+this.app._lokasi+"' "+
							" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'");
					sql.add("insert into hr_gaji_d(no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir)  "+
							" select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nik,'"+this.e_periode.getText()+"','IDAP',b.kode_loker,c.kode_akun,a.gdas,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01',dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) "+
							" from hr_gaji_tmp a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join hr_gaji_param c on c.kode_param='IDAP' and c.kode_lokasi='"+this.app._lokasi+"' "+
							" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'");
					sql.add("insert into hr_gaji_d(no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir)  "+
							" select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nik,'"+this.e_periode.getText()+"','PPLN',b.kode_loker,c.kode_akun,a.gdas,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01',dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) "+
							" from hr_gaji_tmp a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join hr_gaji_param c on c.kode_param='PPLN' and c.kode_lokasi='"+this.app._lokasi+"' "+
							" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'");
					sql.add("insert into hr_gaji_d(no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir)  "+
							" select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nik,'"+this.e_periode.getText()+"','PKOS',b.kode_loker,c.kode_akun,a.gdas,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01',dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) "+
							" from hr_gaji_tmp a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join hr_gaji_param c on c.kode_param='PKOS' and c.kode_lokasi='"+this.app._lokasi+"' "+
							" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'");
					sql.add("insert into hr_gaji_d(no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir)  "+
							" select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nik,'"+this.e_periode.getText()+"','PCTR',b.kode_loker,c.kode_akun,a.gdas,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01',dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) "+
							" from hr_gaji_tmp a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join hr_gaji_param c on c.kode_param='PCTR' and c.kode_lokasi='"+this.app._lokasi+"' "+
							" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'");		
					sql.add("insert into hr_gaji_d(no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir)  "+
							" select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nik,'"+this.e_periode.getText()+"','PGIA',b.kode_loker,c.kode_akun,a.gdas,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01',dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) "+
							" from hr_gaji_tmp a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join hr_gaji_param c on c.kode_param='PGIA' and c.kode_lokasi='"+this.app._lokasi+"' "+
							" where a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.app._userLog+"'");
					
					sql.add("delete from hr_gaji_tmp where nik_user = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
					this.sg.clear(1); this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.sg.validasi();								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}				 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.doClick(this.i_gen);
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
	},					
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.stsSimpan=="1") {
								if (this.cb1.isSelected()) {								
									this.nama_report="server_report_saku2_gl_rptGaji";
									this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_gaji='"+this.e_nb.getText()+"' ";
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
									this.pc1.hide();								
								} 
								else {
									system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
									this.clearLayar();
								} 
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
				this.pc1.show(); 
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1);  this.e_memo.setText("-");	
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doHitung:function(sender){										
		try {	
			this.e_total.setText("0");			
			this.stsSimpan = "0";
			var line; var strSQL = "";
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();																																											
			sql.add("delete from hr_gaji_tmp where nik_user = '"+this.app._userLog+"'");			
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];								
				sql.add("insert into hr_gaji_tmp (no_gaji,kode_lokasi,nik_user,nik,nama,gdas,tdas,tstr,tdap,rapl,idap,ppln,pkos,pctr,pgia) values "+
						"('"+this.app._userLog+"','"+this.app._lokasi+"','"+this.app._userLog+"','"+line.nik+"','"+line.nama+"',"+line.gdas+","+line.tdas+","+line.tstr+","+line.tdap+","+line.rapl+","+line.idap+","+line.ppln+","+line.pkos+","+line.pctr+","+line.pgia+")");
			}			
			sql.add("update a set a.nama=isnull(b.nama,'-') "+
					"from hr_gaji_tmp a left join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+					
					"where a.nik_user = '"+this.app._userLog+"'");
			this.dbLib.execArraySQL(sql);						
			
			strSQL = "select sum(gdas+tdas+tstr+tdap+rapl+idap+ppln+pkos+pctr+pgia) as total from hr_gaji_tmp where nik_user = '"+this.app._userLog+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_total.setText(floatToNilai(line.total));
				} 
			}
			var temu = false; var msg  = "";
			this.e_memo.setText("");			
			strSQL = "select distinct nik from hr_gaji_tmp where nama='-' and nik_user = '"+this.app._userLog+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					temu = true;
					msg+= "NIK tidak terdaftar. [kode : "+line.nik+"]\n";
				}
			}					
			if (!temu) {						
				this.stsTampil = "HITUNG";			
				strSQL = "select * from hr_gaji_tmp where nik_user = '"+this.app._userLog+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();				
					this.selectPage(undefined, 1);		
				} else this.sg.clear(1);																
			}
			else {
				this.e_memo.setText(msg);
				this.e_total.setText("0");
				system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan");
			}			
		} catch(e) {
			alert(e);
		}		
	}
});