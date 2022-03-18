window.app_saku3_transaksi_belajar_fTagihandev = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_belajar_fTagihandev.prototype.parent.constructor.call(this,owner);
		this.maximize();		
		
		this.className  = "app_saku3_transaksi_belajar_fTagihandev";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tagihan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		
		this.pc1 = new pageControl(this,{bound:[20,20,1000,450], childPage:["Daftar Tagihan","Data Tagihan","Filter Cari"]});//,"Filter Cari"
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9, 
		            colTitle:["No Tagihan","Tanggal","NIM","Keterangan","Periode"],
					colWidth:[[4,3,2,1,0],[80,400,100,80,100]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Tagihan",maxLength:20,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});	
        this.cb_nim = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"NIM", multiSelection:false, maxLength:10, tag:1});
        this.e_periode = new portalui_saiLabelEdit(this,{bound:[150,12,220,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.e_tgl = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,20],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,98,18],selectDate:[this,"doSelectDate"]}); 		
        this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Keterangan",maxLength:200,tag:9,change:[this,"doChange"]});
        
        this.e_nb2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,300,20],caption:"No Tagihan",maxLength:20,tag:2});
        this.cb_nim2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"NIM", multiSelection:false, maxLength:10, tag:9});
        this.bLoad = new button(this.pc1.childPage[2],{bound:[120,12,80,18],caption:"Cari Data",click:[this,"doCari"]});	
		
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,30,this.pc1.width-4,this.pc1.height-125], childPage:["Input Tagihan","Test History"]});
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:0,
		            colTitle:["Kode Tagihan","Jenis Tagihan","Nilai","Comment"],
					colWidth:[[3,2,1,0],[100,100,200,100]],
					click:[this,"doLoadComment"],
					colAlign:[[3],[alCenter]],
					columnReadOnly:[true,[1,3],[0,2]],
					buttonStyle:[[0],[bsEllips]],
					colFormat:[[2,3],[cfNilai,cfButton]],		
					autoAppend:true,defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],
					change:[this,"doChangeCell2"]
					});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});

		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc1.width-35,this.pc1.height-135],colCount:1,tag:9, 
			colTitle:["No Tagihan"],
			colWidth:[[0],[100]],					
			readOnly:true,
			dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			//this.cb_jenis.setSQL("select kode_jenis,nama from tipe_tagihan ",["kode_jenis","nama"],false,["Kode","Jenis"],"where","Jenis Tagihan",true);			
			this.cb_nim.setSQL("select nim,nama from dev_siswa ",["nim","nama"],false,["Nim","Nama"],"where","Data Siswa",true);
			this.cb_nim2.setSQL("select nim,nama from dev_siswa ",["nim","nama"],false,["Nim","Nama"],"where","Data Siswa",true);

			
			this.doLoad();
			this.doLoad2();
			
			var sql = new server_util_arrayList();
			sql.add("select kode_jenis,nama from dev_jenis where kode_lokasi='"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_belajar_fTagihandev.extend(window.childForm);
window.app_saku3_transaksi_belajar_fTagihandev.implement({
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
		   
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into dev_tagihan_m(no_tagihan, tanggal, nim, keterangan,kode_lokasi,periode) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_nim.getText()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) { 
							sql.add("insert into dev_tagihan_d(no_tagihan,kode_jenis,nilai,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+",'"+this.app._lokasi+"')");
						
						}
					}							
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from dev_tagihan_m where no_tagihan = '"+this.e_nb.getText()+"'");
					sql.add("delete from dev_tagihan_d where no_tagihan = '"+this.e_nb.getText()+"'");
					sql.add("insert into dev_tagihan_m(no_tagihan, tanggal, nim, keterangan,kode_lokasi,periode) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_nim.getText()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) { 
							sql.add("insert into dev_tagihan_d (no_tagihan,kode_jenis,nilai,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+",'"+this.app._lokasi+"')");
					
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
					sql.add("delete from dev_tagihan_m where no_tagihan = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from dev_tagihan_d where no_tagihan = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
    },
    doSelectDate: function(sender, y,m,d){
        if (m < 10) m = "0" + m;	
        var periode='201812';		
		if (parseFloat(periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(periode);					
		}			
		if (this.stsSimpan == 1) this.doClick();					
	},
	doClick:function(sender){
        if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dev_tagihan_m","no_tagihan",this.app._lokasi+"-TG"+this.e_periode.getText().substr(2,4)+".","000"));
			// this.e_ket.setFocus();
		}
    },
	doChange: function(sender){
		try{
			
			if (sender == this.e_nb && this.e_nb.getText() != ""){
				var strSQL = "select no_tagihan, tanggal, nim, keterangan,periode "+
				             "from dev_tagihan_m where no_tagihan ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setDateString(line.tanggal);
						this.cb_nim.setText(line.nim);
						this.e_ket.setText(line.keterangan);
						var strSQL = "select a.kode_jenis, a.nilai, b.nama "+
									 "from dev_tagihan_d a "+
									 "inner join dev_jenis b on a.kode_jenis = b.kode_jenis " + 
									 "where a.no_tagihan = '"+this.e_nb.getText()+"' ";					
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg2.appendData([line.kode_jenis,line.nama,floatToNilai(line.nilai),"Comment"]);
							}
						} else this.sg2.clear(1);
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}	
						
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Tagihan",sender,undefined, 
						    "select kode_jenis,nama from dev_jenis where kode_lokasi='"+this.app._lokasi+"'",
							"select count(*) from dev_jenis where kode_lokasi='"+this.app._lokasi+"'",
							["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	
	doChangeCell2: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg2.cells(0,row) != "") {				
				var tipe = this.dataTipe.get(sender.cells(0,row));				
				if (tipe) { 
					sender.cells(1,row,tipe);
					sender.cells(3,row,"Comment");

				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Tagihan "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell2");		
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataTipe = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataTipe.set(line.kode_jenis, line.nama);										
								}								
							}							
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCari:function(sender){								
		try {
            var filter='';
			if (this.e_nb2.getText() != "") {
				filter = " no_tagihan like '%"+this.e_nb2.getText()+"%' ";
			}
			if (this.cb_nim2.getText() != "") {
				filter =" nim like '%"+this.cb_nim2.getText()+"%' ";
			}
			if (this.e_nb2.getText() != "" && this.cb_nim2.getText() != "") {
				filter = "no_tagihan like '%"+this.e_nb2.getText()+"%' and nim like '%"+this.cb_nim2.getText()+"%'";
			}
			
			if(filter != ''){
				var strSQL = "select no_tagihan,convert(varchar,tanggal,103) as tanggal,nim,keterangan,periode from dev_tagihan_m "+	
						 "where "+filter;
			}else{
				var strSQL = "select no_tagihan,convert(varchar,tanggal,103) as tanggal,nim,keterangan,periode from dev_tagihan_m ";
			}
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {			
			var strSQL = "select no_tagihan, convert(varchar,tanggal,103) as tanggal, nim, keterangan,periode from dev_tagihan_m";	
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line.no_tagihan,line.tanggal,line.nim,line.keterangan,line.periode]); 
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
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_nb.setText(this.sg1.cells(0,row));	
			}
		} catch(e) {alert(e);}
	},
	doLoadComment: function(sender, col, row){
		try{
			if (this.sg2.cells(3,row) != "") {
				if (sender == this.sg2) {
					if (col == 3) {
						this.nama_report="server_report_saku3_belajar_rptComment";
						this.filter2 = this.app._lokasi+"/"+this.e_periode.getText();
						this.filter = this.filter2;
						this.viewer.prepare();
						this.viewer.setVisible(true);
						this.app._mainForm.pButton.setVisible(false);
						this.app._mainForm.reportNavigator.setVisible(true);
						this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
						this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
						this.app._mainForm.reportNavigator.rearrange();
						this.showFilter = undefined;
						// this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
						this.viewer.useIframe(this.report.previewWithBs(this.nama_report,this.filter, 1,1, this.showFilter, this.app._namalokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
						this.page = 1;
						this.allBtn = false;
						this.pc1.hide();
					}
				}
				
			}
		}catch(e) {alert(e);}
		
	},
	doLoad2: function(sender, col, row){
		try{
		// this.nama_report="server_report_saku3_belajar_rptTest2";
		// this.filter2 = this.app._lokasi+"/"+this.e_periode.getText();
		// this.filter = this.filter2;
		
		// this.viewer.prepare();
		// this.viewer.setVisible(true);
		// this.app._mainForm.pButton.setVisible(false);
		// this.app._mainForm.reportNavigator.setVisible(true);
		// this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
		// this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		// this.app._mainForm.reportNavigator.rearrange();
		// this.showFilter = undefined;
		// this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
		// this.viewer.useIframe(this.report.previewWithBs(this.nama_report,this.filter, 1,1, this.showFilter, this.app._namalokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		// this.page = 1;
		// this.allBtn = false;
		// this.pc1.hide();
		this.printHeader = "<div><h3>Test History</h3></div>";
		// this.outerHtml = "<h3>Test History</h3><div>Ini works</div>";
		// this.sg3.print(this.printHeader, this.outerHtml);
		this.outerHtml="<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
		"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
		"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
		"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
		"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
		"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
		"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
		"<div class='row' style='padding-top: 5px;padding-left: 5px;'>"+
        "<div class='col-md-6'>"+
        "  <ul class='timeline'>"+
        "    <li class='time-label'>"+
        "          <span class='bg-red'>"+
        "            10 Feb. 2014"+
        "          </span>"+
        "    </li>"+
        "    <!-- /.timeline-label -->"+
        "    <!-- timeline item -->"+
        "    <li>"+
        "      <i class='fa fa-envelope bg-blue'></i>"+
        "      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
        "        <span class='time'><i class='fa fa-clock-o'></i> 12:05</span>"+
        "        <h3 class='timeline-header'><a href='#' style='outline: none;text-decoration: none;'>Support Team</a> sent you an email</h3>"+
        "        <div class='timeline-body' style='box-sizing: border-box;'>"+
        "          Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles.. "+
        "        </div>"+
		"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
        "          <a class='btn btn-primary btn-xs' style='display: inline-block;padding: 3px;margin-bottom: 0;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;color: white;'>Read more</a>"+
        "          <a class='btn btn-danger btn-xs' style='display: inline-block;padding: 3px;margin-bottom: 0;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;color: white;'>Delete</a>"+
        "        </div>"+
        "      </div>"+
        "    </li>"+
        "    <!-- END timeline item -->"+
        "    <!-- timeline item -->"+
        "    <li>"+
        "     <i class='fa fa-user bg-aqua'></i>"+
        "      <div class='timeline-item' style='border: 1px solid #dedcdc;'>"+
        "        <span class='time'><i class='fa fa-clock-o'></i> 5 mins ago</span>"+
        "        <h3 class='timeline-header no-border'><a style='outline: none;text-decoration: none;' href='#'>Sarah Young</a> accepted your friend request</h3>"+
        "      </div>"+
        "    </li>"+
        "    <!-- END timeline item -->"+
        "    <li>"+
        "      <i class='fa fa-clock-o bg-gray'></i>"+
        "    </li>"+
        "  </ul>"+
        "</div>"+
        "<!-- /.col -->"+
      	"</div>"+
		"";
		this.sg3.setInnerHTML(this.outerHtml);
		
		// this.pc2.childPage[1].previewWithBs(this.nama_report,this.filter, 1,1, this.showFilter, this.app._namalokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
		// this.page = 1;
		}catch(e) {alert(e);}
					
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
			break;
		}
	},
});